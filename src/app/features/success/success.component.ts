import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../core/services/resume.service';
import { CvPreviewComponent } from '../../shared/components/cv-templates/cv-preview/cv-preview.component';
import { PricingModalComponent } from '../../shared/components/pricing-modal/pricing-modal.component';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, CommonModule, CvPreviewComponent, PricingModalComponent],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  readonly resumeService = inject(ResumeService);
  readonly resumeData    = this.resumeService.resumeData;
  readonly templateId    = this.resumeService.templateId;

  showPreviewModal = signal(false);
  showPricing      = signal(false);

  openPreview(): void  { this.showPreviewModal.set(true);  }
  closePreview(): void { this.showPreviewModal.set(false); }

  downloadPdf(): void {
    window.print();
  }

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
