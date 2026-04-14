import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CvPreviewComponent } from '../../shared/components/cv-templates/cv-preview/cv-preview.component';
import { MOCK_RESUME_DATA } from '../../shared/components/cv-templates/mock-resume-data';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CvPreviewComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  readonly mockData = MOCK_RESUME_DATA;

  readonly steps = [
    {
      number: '1',
      icon: 'dashboard',
      title: 'Escolha um Template',
      description: 'Navegue por nossa galeria curada e encontre o estilo que mais combina com seu perfil profissional.',
      colorClass: 'bg-primary/20 text-primary'
    },
    {
      number: '2',
      icon: 'edit_note',
      title: 'Preencha seus Dados',
      description: 'Nossa interface intuitiva guia você através de cada seção, sugerindo as melhores palavras-chave.',
      colorClass: 'bg-primary text-on-primary'
    },
    {
      number: '3',
      icon: 'download',
      title: 'Baixe em PDF',
      description: 'Exporte seu currículo pronto para impressão e totalmente otimizado para sistemas de leitura digital.',
      colorClass: 'bg-primary/20 text-primary'
    },
  ];

  readonly showcaseTemplates = [
    { id: 'moderno-02',   name: 'Moderno Geométrico',    category: 'Moderno',   isPremium: true  },
    { id: 'executivo-01', name: 'Executivo Profissional', category: 'Executivo', isPremium: true  },
    { id: 'criativo-02',  name: 'Criativo Dark',          category: 'Criativo',  isPremium: true  },
  ];
}
