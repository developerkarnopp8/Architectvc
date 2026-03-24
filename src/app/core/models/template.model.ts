export type TemplateCategory = 'moderno' | 'criativo' | 'executivo' | 'minimalista';

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnailUrl: string;
  isPremium: boolean;
  description: string;
  previewImages: string[];
}

export interface TemplateFilter {
  category: TemplateCategory | 'todos';
}
