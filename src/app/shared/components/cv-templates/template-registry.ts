import { Type } from '@angular/core';
import { ResumeData } from '../../../core/models';
import { TemplateCategory } from '../../../core/models/template.model';

export interface TemplateRegistryItem {
  id: string;
  name: string;
  category: TemplateCategory;
  isPremium: boolean;
  description: string;
  // Loaded lazily to avoid circular deps — populated after all components are imported
  component?: Type<{ data: ResumeData }>;
}

export const TEMPLATE_LIST: TemplateRegistryItem[] = [
  {
    id: 'criativo-01',
    name: 'Criativo Minimalista',
    category: 'criativo',
    isPremium: false,
    description: 'Layout clean e ousado para profissionais de comunicação.',
  },
  {
    id: 'criativo-02',
    name: 'Criativo Dark',
    category: 'criativo',
    isPremium: true,
    description: 'Visual escuro e vibrante com destaque em neon.',
  },
  {
    id: 'executivo-01',
    name: 'Executivo Profissional',
    category: 'executivo',
    isPremium: true,
    description: 'Sóbrio e elegante para cargos de liderança.',
  },
  {
    id: 'executivo-02',
    name: 'Executivo Moderno',
    category: 'executivo',
    isPremium: true,
    description: 'Destaque azul corporativo com foto e dois painéis.',
  },
  {
    id: 'minimalista-01',
    name: 'Minimalista Claro',
    category: 'minimalista',
    isPremium: true,
    description: 'Cabeçalho em cinza suave com foco no conteúdo.',
  },
  {
    id: 'minimalista-02',
    name: 'Minimalista Elegante',
    category: 'minimalista',
    isPremium: true,
    description: 'Tipografia espaçada e layout refinado.',
  },
  {
    id: 'moderno-01',
    name: 'Moderno Magenta',
    category: 'moderno',
    isPremium: true,
    description: 'Seções marcadas com pontos vibrantes em magenta.',
  },
  {
    id: 'moderno-02',
    name: 'Moderno Geométrico',
    category: 'moderno',
    isPremium: true,
    description: 'Elementos geométricos e linha do tempo de experiências.',
  },
];
