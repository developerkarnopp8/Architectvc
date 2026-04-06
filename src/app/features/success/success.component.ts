import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../core/services/resume.service';
import { CvPreviewComponent } from '../../shared/components/cv-templates/cv-preview/cv-preview.component';
import { PricingModalComponent } from '../../shared/components/pricing-modal/pricing-modal.component';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, CommonModule, CvPreviewComponent, PricingModalComponent],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
  readonly resumeService = inject(ResumeService);
  readonly resumeData    = this.resumeService.resumeData;
  readonly templateId    = this.resumeService.templateId;

  private route          = inject(ActivatedRoute);
  private api            = inject(ApiService);
  private authService    = inject(AuthService);
  private paymentService = inject(PaymentService);

  showPreviewModal = signal(false);
  showPricing      = signal(false);

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      this.api.post<{ confirmed: boolean; plan: string; templateId: string | null }>(
        '/payments/confirm-session', { sessionId }
      ).subscribe({
        next: (res) => {
          if (res.confirmed) this.authService.refreshUser();
        },
      });
    }
  }

  openPreview(): void  { this.showPreviewModal.set(true);  }
  closePreview(): void { this.showPreviewModal.set(false); }

  downloadPdf(): void {
    const tid = this.templateId();
    const user = this.authService.user();

    // Se for plano free com unlock único, consome o unlock antes de imprimir
    if (tid && user?.plan !== 'pro') {
      this.paymentService.consumeUnlock(tid).subscribe({
        next: () => window.print(),
        error: () => window.print(), // imprime mesmo se falhar
      });
    } else {
      window.print();
    }
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
