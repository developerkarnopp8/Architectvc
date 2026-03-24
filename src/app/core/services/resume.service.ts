import { Injectable, signal, computed, effect } from '@angular/core';
import {
  Resume,
  ResumeData,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Language,
  ResumeProgress,
} from '../models';

const STORAGE_KEY = 'architect_cv_resume';
const TEMPLATE_KEY = 'architect_cv_template';

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  jobTitle: '',
  city: '',
  state: '',
  email: '',
  phone: '',
  linkedIn: '',
  github: '',
  portfolio: '',
  about: '',
  avatarUrl: '',
};

const defaultResumeData: ResumeData = {
  personalInfo: { ...defaultPersonalInfo },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
};

@Injectable({ providedIn: 'root' })
export class ResumeService {
  // Template selecionado
  private _templateId = signal<string>(localStorage.getItem(TEMPLATE_KEY) ?? 'criativo-01');
  readonly templateId = this._templateId.asReadonly();

  // Estado central do currículo em edição
  private _resumeData = signal<ResumeData>(this._loadFromStorage());

  // Leitura pública (readonly computed)
  readonly resumeData = computed(() => this._resumeData());
  readonly personalInfo = computed(() => this._resumeData().personalInfo);
  readonly experiences = computed(() => this._resumeData().experiences);
  readonly education = computed(() => this._resumeData().education);
  readonly skills = computed(() => this._resumeData().skills);
  readonly languages = computed(() => this._resumeData().languages);

  // Progresso calculado automaticamente
  readonly progress = computed<ResumeProgress>(() => {
    const data = this._resumeData();
    const p = data.personalInfo;

    const sections = [
      !!(p.fullName && p.email && p.phone),           // pessoal básico
      !!p.about,                                        // sobre
      data.experiences.length > 0,                     // experiências
      data.education.length > 0,                       // educação
      data.skills.length > 0 || data.languages.length > 0, // skills/idiomas
    ];

    const completed = sections.filter(Boolean).length;
    return {
      totalSections: sections.length,
      completedSections: completed,
      percentage: Math.round((completed / sections.length) * 100),
    };
  });

  constructor() {
    // Persiste no localStorage sempre que os dados mudam
    effect(() => {
      const data = this._resumeData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
    effect(() => {
      localStorage.setItem(TEMPLATE_KEY, this._templateId());
    });
  }

  // === Template ===

  setTemplate(id: string): void {
    this._templateId.set(id);
    this.reset();
  }

  // === Personal Info ===

  updatePersonalInfo(partial: Partial<PersonalInfo>): void {
    this._resumeData.update(d => ({
      ...d,
      personalInfo: { ...d.personalInfo, ...partial },
    }));
  }

  // === Experiences ===

  addExperience(): void {
    const blank: WorkExperience = {
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: null,
      description: '',
      bullets: [],
    };
    this._resumeData.update(d => ({
      ...d,
      experiences: [...d.experiences, blank],
    }));
  }

  updateExperience(id: string, partial: Partial<WorkExperience>): void {
    this._resumeData.update(d => ({
      ...d,
      experiences: d.experiences.map(e =>
        e.id === id ? { ...e, ...partial } : e
      ),
    }));
  }

  removeExperience(id: string): void {
    this._resumeData.update(d => ({
      ...d,
      experiences: d.experiences.filter(e => e.id !== id),
    }));
  }

  // === Education ===

  addEducation(): void {
    const blank: Education = {
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: null,
      description: '',
    };
    this._resumeData.update(d => ({
      ...d,
      education: [...d.education, blank],
    }));
  }

  updateEducation(id: string, partial: Partial<Education>): void {
    this._resumeData.update(d => ({
      ...d,
      education: d.education.map(e =>
        e.id === id ? { ...e, ...partial } : e
      ),
    }));
  }

  removeEducation(id: string): void {
    this._resumeData.update(d => ({
      ...d,
      education: d.education.filter(e => e.id !== id),
    }));
  }

  // === Skills ===

  addSkill(name: string, category?: string): void {
    const skill: Skill = { id: crypto.randomUUID(), name, category };
    this._resumeData.update(d => ({
      ...d,
      skills: [...d.skills, skill],
    }));
  }

  removeSkill(id: string): void {
    this._resumeData.update(d => ({
      ...d,
      skills: d.skills.filter(s => s.id !== id),
    }));
  }

  // === Languages ===

  addLanguage(name: string, level: Language['level']): void {
    const lang: Language = { id: crypto.randomUUID(), name, level };
    this._resumeData.update(d => ({
      ...d,
      languages: [...d.languages, lang],
    }));
  }

  removeLanguage(id: string): void {
    this._resumeData.update(d => ({
      ...d,
      languages: d.languages.filter(l => l.id !== id),
    }));
  }

  // === Reset ===

  reset(): void {
    this._resumeData.set({ ...defaultResumeData, personalInfo: { ...defaultPersonalInfo } });
    localStorage.removeItem(STORAGE_KEY);
  }

  // === Persistência ===

  private _loadFromStorage(): ResumeData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as ResumeData;
    } catch {
      // ignora dados corrompidos
    }
    return { ...defaultResumeData, personalInfo: { ...defaultPersonalInfo } };
  }
}
