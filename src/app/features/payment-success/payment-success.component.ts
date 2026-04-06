import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-surface">
      <div class="text-center px-6">
        @if (status() === 'loading') {
          <span class="material-symbols-outlined text-6xl text-primary animate-spin block mb-4">progress_activity</span>
          <p class="text-secondary font-body text-lg">Confirmando seu pagamento...</p>
        }
        @if (status() === 'success') {
          <span class="material-symbols-outlined text-6xl text-tertiary block mb-4">check_circle</span>
          <h1 class="font-headline font-bold text-2xl text-on-surface mb-2">Pagamento confirmado!</h1>
          <p class="text-secondary font-body mb-6">Seu template foi desbloqueado. Redirecionando...</p>
        }
        @if (status() === 'error') {
          <span class="material-symbols-outlined text-6xl text-error block mb-4">error</span>
          <h1 class="font-headline font-bold text-2xl text-on-surface mb-2">Algo deu errado</h1>
          <p class="text-secondary font-body mb-6">Não foi possível confirmar seu pagamento.</p>
          <button (click)="goToTemplates()" class="px-6 py-3 bg-primary text-on-primary rounded-xl font-label font-semibold">
            Ir para Templates
          </button>
        }
      </div>
    </div>
  `,
})
export class PaymentSuccessComponent implements OnInit {
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private api            = inject(ApiService);
  private authService    = inject(AuthService);
  private paymentService = inject(PaymentService);

  status = signal<'loading' | 'success' | 'error'>('loading');

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!sessionId) {
      this.router.navigate(['/templates']);
      return;
    }

    // Se não está logado, redireciona para login com returnUrl
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: `/payment-success?session_id=${sessionId}` }
      });
      return;
    }

    this.api.post<{ confirmed: boolean; plan: string; templateId: string | null }>(
      '/payments/confirm-session', { sessionId }
    ).subscribe({
      next: (res) => {
        if (res.confirmed) {
          this.authService.refreshUser();
          this.paymentService.loadUnlockedTemplates();
          this.status.set('success');
          setTimeout(() => this.router.navigate(['/templates']), 2000);
        } else {
          this.status.set('error');
        }
      },
      error: () => this.status.set('error'),
    });
  }

  goToTemplates() {
    this.router.navigate(['/templates']);
  }
}
