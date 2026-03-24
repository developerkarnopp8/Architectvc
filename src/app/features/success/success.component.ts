import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  readonly tips = [
    {
      icon: 'lightbulb',
      iconColor: 'text-primary',
      title: 'Personalize para cada vaga',
      description: 'Adapte suas palavras-chave para cada vaga específica para passar pelos filtros automáticos (ATS).',
    },
    {
      icon: 'trending_up',
      iconColor: 'text-tertiary',
      title: 'Como melhorar sua busca',
      description: 'Saiba como personalizar seu objetivo para diferentes vagas sem perder a essência.',
    },
  ];
}
