import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export type PlanId = 'monthly' | 'annual' | 'single' | 'test';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  currency: string;
  interval: string;
  description: string;
  badge?: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private api = inject(ApiService);

  // Signal global — atualizado após compra e consumo
  unlockedTemplates = signal<string[]>([]);

  getPlans(): Observable<Plan[]> {
    return this.api.get<Plan[]>('/payments/plans');
  }

  createCheckout(plan: PlanId, templateId?: string): Observable<{ url: string }> {
    return this.api.post<{ url: string }>('/payments/checkout', { plan, templateId });
  }

  loadUnlockedTemplates(): void {
    this.api.get<string[]>('/payments/unlocked-templates').subscribe(ids => {
      this.unlockedTemplates.set(ids);
    });
  }

  consumeUnlock(templateId: string): Observable<{ consumed: boolean }> {
    return this.api.post<{ consumed: boolean }>('/payments/consume-unlock', { templateId });
  }
}
