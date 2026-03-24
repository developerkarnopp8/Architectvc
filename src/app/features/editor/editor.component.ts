import { Component, inject, computed, OnInit } from '@angular/core';
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
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly resumeService = inject(ResumeService);

  // === Dados do serviço (readonly, via computed) ===
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

  // === Formulários ===
  personalForm!: FormGroup;

  // Skill / Language inline inputs
  newSkillName = '';
  newLangName = '';
  newLangLevel: Language['level'] = 'intermediário';
  readonly languageLevels: Language['level'][] = ['básico','intermediário','avançado','fluente','nativo'];

  // === Lifecycle ===
  ngOnInit(): void {
    // If a templateId query param is provided, switch template (and reset data)
    const paramTemplateId = this.route.snapshot.queryParamMap.get('templateId');
    if (paramTemplateId && paramTemplateId !== this.resumeService.templateId()) {
      this.resumeService.setTemplate(paramTemplateId);
    }

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

    // Sincroniza form → service em tempo real
    this.personalForm.valueChanges.subscribe(v =>
      this.resumeService.updatePersonalInfo(v)
    );
  }

  // === Navegação ===
  setSection(section: EditorSection): void { this.activeSection = section; }

  nextSection(): void {
    if (!this.isLastSection)
      this.activeSection = this.sections[this.currentSectionIndex + 1].id;
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

  removeExp(id: string): void { this.resumeService.removeExperience(id); }
  addExp(): void             { this.resumeService.addExperience(); }

  // === Educação ===
  updateEdu(id: string, field: string, value: string): void {
    this.resumeService.updateEducation(id, { [field]: value } as any);
  }

  removeEdu(id: string): void { this.resumeService.removeEducation(id); }
  addEdu(): void             { this.resumeService.addEducation(); }

  // === Skills ===
  addSkill(): void {
    const name = this.newSkillName.trim();
    if (name) { this.resumeService.addSkill(name); this.newSkillName = ''; }
  }
  onSkillKeydown(e: KeyboardEvent): void { if (e.key === 'Enter') this.addSkill(); }

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
