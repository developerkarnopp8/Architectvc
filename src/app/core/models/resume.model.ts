// === Seções do currículo ===

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  about: string;
  avatarUrl?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;       // MM/YYYY
  endDate: string | null;  // null = "Atual"
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

export type SkillLevel = 'básico' | 'intermediário' | 'avançado' | 'fluente' | 'nativo';

export interface Language {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

// === Currículo completo ===

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}

export type ResumeStatus = 'draft' | 'complete';

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  data: ResumeData;
  status: ResumeStatus;
  createdAt: string;
  updatedAt: string;
}

// Usado para criar/atualizar
export type CreateResumePayload = Omit<Resume, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
export type UpdateResumePayload = Partial<CreateResumePayload>;

// Progresso de preenchimento
export interface ResumeProgress {
  totalSections: number;
  completedSections: number;
  percentage: number;
}
