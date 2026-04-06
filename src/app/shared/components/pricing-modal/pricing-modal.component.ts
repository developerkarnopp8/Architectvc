import { Component, output, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService, Plan, PlanId } from '../../../core/services/payment.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-modal.component.html',
})
export class PricingModalComponent implements OnInit {
  closed = output<void>();

  private paymentService = inject(PaymentService);
  private authService    = inject(AuthService);
  private router         = inject(Router);

  plans          = signal<Plan[]>([]);
  loading        = signal<PlanId | null>(null);
  showLoginPrompt = signal(false);

  ngOnInit() {
    this.paymentService.getPlans().subscribe(p => this.plans.set(p));
  }

  selectPlan(plan: Plan) {
    if (!this.authService.isLoggedIn()) {
      this.showLoginPrompt.set(true);
      return;
    }

    this.loading.set(plan.id);
    this.paymentService.createCheckout(plan.id).subscribe({
      next: ({ url }) => {
        if (url) window.location.href = url;
      },
      error: (err) => {
        this.loading.set(null);
        if (err.status === 401) this.showLoginPrompt.set(true);
      },
    });
  }

  goToLogin() {
    this.closed.emit();
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.closed.emit();
    this.router.navigate(['/register']);
  }

  close() {
    this.closed.emit();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  intervalLabel(interval: string): string {
    const map: Record<string, string> = { month: '/mês', year: '/ano', once: '' };
    return map[interval] ?? '';
  }
}
