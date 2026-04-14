import { Component, inject, computed, OnInit, signal, effect } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResumeService } from '../../core/services/resume.service';
import { ResumeApiService } from '../../core/services/resume-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { Language } from '../../core/models';
import { CvPreviewComponent } from '../../shared/components/cv-templates/cv-preview/cv-preview.component';

export type EditorSection = 'personal' | 'experience' | 'education' | 'skills' | 'languages';

interface SectionNav {
  id: EditorSection;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, CvPreviewComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  private fb         = inject(FormBuilder);
  private router     = inject(Router);
  private route      = inject(ActivatedRoute);
  readonly resumeService = inject(ResumeService);
  private resumeApi  = inject(ResumeApiService);
  private auth       = inject(AuthService);

  // === Dados do serviço ===
  readonly personalInfo  = this.resumeService.personalInfo;
  readonly experiences   = this.resumeService.experiences;
  readonly educationList = this.resumeService.education;
  readonly skills        = this.resumeService.skills;
  readonly languages     = this.resumeService.languages;
  readonly progress      = this.resumeService.progress;
  readonly templateId    = this.resumeService.templateId;
  readonly resumeData    = this.resumeService.resumeData;

  readonly progressPills = computed(() =>
    Array.from({ length: this.progress().totalSections }, (_, i) =>
      i < this.progress().completedSections
    )
  );

  // === Save status ===
  saveStatus = signal<'idle' | 'saving' | 'saved' | 'error'>('idle');
  showAuthPrompt = signal(false);
  private _saveTimer: ReturnType<typeof setTimeout> | null = null;
  private _initialized = false;

  static readonly PENDING_KEY = 'architect_cv_pending_resume';

  // === Navegação entre seções ===
  readonly sections: SectionNav[] = [
    { id: 'personal',   icon: 'person',    label: 'Pessoal'      },
    { id: 'experience', icon: 'work',       label: 'Experiência'  },
    { id: 'education',  icon: 'school',     label: 'Educação'     },
    { id: 'skills',     icon: 'psychology', label: 'Habilidades'  },
    { id: 'languages',  icon: 'translate',  label: 'Idiomas'      },
  ];

  readonly sectionLabels: Record<EditorSection, string> = {
    personal:   'Informações Pessoais',
    experience: 'Experiência Profissional',
    education:  'Educação',
    skills:     'Habilidades',
    languages:  'Idiomas',
  };

  activeSection: EditorSection = 'personal';

  get currentSectionLabel(): string { return this.sectionLabels[this.activeSection]; }
  get currentSectionIndex(): number { return this.sections.findIndex(s => s.id === this.activeSection); }
  get isLastSection(): boolean { return this.currentSectionIndex === this.sections.length - 1; }
  get isFirstSection(): boolean { return this.currentSectionIndex === 0; }
  get canDownload(): boolean { return this.personalForm?.valid ?? false; }

  // === Formulários ===
  personalForm!: FormGroup;

  newSkillName = '';
  newLangName = '';
  newLangLevel: Language['level'] = 'intermediário';
  readonly languageLevels: Language['level'][] = ['básico','intermediário','avançado','fluente','nativo'];

  constructor() {
    // Auto-save: dispara 2s após cada mudança nos dados (somente se autenticado)
    effect(() => {
      const data = this.resumeData();
      if (!this._initialized) return;
      if (!this.auth.isLoggedIn()) return;

      if (this._saveTimer) clearTimeout(this._saveTimer);
      this.saveStatus.set('idle');
      this._saveTimer = setTimeout(() => this._autoSave(data), 2000);
    });
  }

  // === Lifecycle ===
  ngOnInit(): void {
    const routeResumeId = this.route.snapshot.paramMap.get('resumeId');
    const paramTemplateId = this.route.snapshot.queryParamMap.get('templateId');

    if (routeResumeId) {
      // Editar currículo existente: carrega da API
      this.resumeApi.get(routeResumeId).subscribe({
        next: (resume) => {
          this.resumeService.loadFromApiResume(resume);
          this._buildForm();
          this._initialized = true;
        },
        error: () => this.router.navigate(['/dashboard']),
      });
    } else {
      // Restaura currículo pendente (utilizador acabou de fazer login/register)
      const pending = this.auth.consumePendingResume();
      if (pending) {
        this.resumeService.setTemplate(pending.templateId);
        this.resumeService.loadFromApiResume({ templateId: pending.templateId, data: pending.data } as any);
      } else if (paramTemplateId && paramTemplateId !== this.resumeService.templateId()) {
        this.resumeService.setTemplate(paramTemplateId);
      }
      this._buildForm();
      this._initialized = true;

      // Salva imediatamente ao entrar no editor (garante que o CV fica no histórico)
      if (this.auth.isLoggedIn()) {
        this._autoSave(this.resumeData());
      }
    }
  }

  private _buildForm(): void {
    const p = this.personalInfo();
    this.personalForm = this.fb.group({
      fullName:  [p.fullName,  Validators.required],
      jobTitle:  [p.jobTitle,  Validators.required],
      city:      [p.city,      Validators.required],
      state:     [p.state,     Validators.required],
      email:     [p.email,     [Validators.required, Validators.email]],
      phone:     [p.phone,     Validators.required],
      linkedIn:  [p.linkedIn  ?? ''],
      github:    [p.github    ?? ''],
      portfolio: [p.portfolio ?? ''],
      about:     [p.about,     Validators.required],
    });

    this.personalForm.valueChanges.subscribe(v =>
      this.resumeService.updatePersonalInfo(v)
    );
  }

  private _autoSave(data: typeof this.resumeData extends () => infer T ? T : never): void {
    const resumeId = this.resumeService.currentResumeId();
    this.saveStatus.set('saving');

    if (resumeId) {
      this.resumeApi.update(resumeId, { data, templateId: this.templateId() }).subscribe({
        next: () => this.saveStatus.set('saved'),
        error: () => this.saveStatus.set('error'),
      });
    } else {
      this.resumeApi.create({ templateId: this.templateId(), data }).subscribe({
        next: (resume) => {
          this.resumeService.currentResumeId.set(resume.id);
          this.router.navigate(['/editor', resume.id], { replaceUrl: true });
          this.saveStatus.set('saved');
        },
        error: () => this.saveStatus.set('error'),
      });
    }
  }

  // === Navegação ===
  setSection(section: EditorSection): void { this.activeSection = section; }

  nextSection(): void {
    if (this.isLastSection) {
      if (!this.auth.isLoggedIn()) {
        localStorage.setItem(EditorComponent.PENDING_KEY, JSON.stringify({
          templateId: this.templateId(),
          data: this.resumeData(),
        }));
        this.showAuthPrompt.set(true);
      } else {
        const resumeId = this.resumeService.currentResumeId();
        if (resumeId) {
          this.router.navigate(['/success', resumeId]);
        } else {
          this.router.navigate(['/success']);
        }
      }
      return;
    }
    this.activeSection = this.sections[this.currentSectionIndex + 1].id;
  }

  goToLoginFromEditor() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/editor' } });
  }

  goToRegisterFromEditor() {
    this.router.navigate(['/register'], { queryParams: { returnUrl: '/editor' } });
  }

  prevSection(): void {
    if (!this.isFirstSection)
      this.activeSection = this.sections[this.currentSectionIndex - 1].id;
  }

  changeTemplate(): void {
    this.router.navigate(['/templates']);
  }

  // === Experiências ===
  updateExp(id: string, field: string, value: string): void {
    this.resumeService.updateExperience(id, { [field]: value } as any);
  }

  onExpDateInput(event: Event, id: string, field: string): void {
    const input = event.target as HTMLInputElement;
    input.value = this._applyDateMask(input.value);
    this.resumeService.updateExperience(id, { [field]: input.value } as any);
  }

  removeExp(id: string): void { this.resumeService.removeExperience(id); }
  addExp(): void             { this.resumeService.addExperience(); }

  addBullet(expId: string): void {
    const exp = this.experiences().find(e => e.id === expId);
    if (!exp) return;
    this.resumeService.updateExperience(expId, { bullets: [...exp.bullets, ''] });
  }

  updateBullet(expId: string, index: number, value: string): void {
    const exp = this.experiences().find(e => e.id === expId);
    if (!exp) return;
    const bullets = [...exp.bullets];
    bullets[index] = value;
    this.resumeService.updateExperience(expId, { bullets });
  }

  removeBullet(expId: string, index: number): void {
    const exp = this.experiences().find(e => e.id === expId);
    if (!exp) return;
    const bullets = exp.bullets.filter((_, i) => i !== index);
    this.resumeService.updateExperience(expId, { bullets });
  }

  // === Educação ===
  updateEdu(id: string, field: string, value: string): void {
    this.resumeService.updateEducation(id, { [field]: value } as any);
  }

  onEduDateInput(event: Event, id: string, field: string): void {
    const input = event.target as HTMLInputElement;
    input.value = this._applyDateMask(input.value);
    this.resumeService.updateEducation(id, { [field]: input.value } as any);
  }

  private _applyDateMask(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 6);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  }

  removeEdu(id: string): void { this.resumeService.removeEducation(id); }
  addEdu(): void             { this.resumeService.addEducation(); }

  // === Skills ===
  addSkill(): void {
    const name = this.newSkillName.trim();
    if (name) { this.resumeService.addSkill(name); this.newSkillName = ''; }
  }
  onSkillKeydown(e: KeyboardEvent): void { if (e.key === 'Enter') this.addSkill(); }

  // === Avatar ===
  readonly AVATAR_TEMPLATES = new Set(['criativo-02', 'executivo-02', 'moderno-02']);

  templateHasAvatar(): boolean {
    return this.AVATAR_TEMPLATES.has(this.templateId());
  }

  onAvatarUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      this.resumeService.updatePersonalInfo({ avatarUrl: url });
    };
    reader.readAsDataURL(file);
  }

  removeAvatar(): void {
    this.resumeService.updatePersonalInfo({ avatarUrl: '' });
  }

  // === Idiomas ===
  addLanguage(): void {
    const name = this.newLangName.trim();
    if (name) {
      this.resumeService.addLanguage(name, this.newLangLevel);
      this.newLangName = '';
      this.newLangLevel = 'intermediário';
    }
  }
}
