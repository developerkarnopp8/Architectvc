import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export type PlanId = 'monthly' | 'annual' | 'single';

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

  getPlans(): Observable<Plan[]> {
    return this.api.get<Plan[]>('/payments/plans');
  }

  createCheckout(plan: PlanId): Observable<{ url: string }> {
    return this.api.post<{ url: string }>('/payments/checkout', { plan });
  }
}
