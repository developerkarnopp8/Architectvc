import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CvPreviewComponent } from '../../shared/components/cv-templates/cv-preview/cv-preview.component';
import { PricingModalComponent } from '../../shared/components/pricing-modal/pricing-modal.component';
import { TEMPLATE_LIST, TemplateRegistryItem } from '../../shared/components/cv-templates/template-registry';
import { MOCK_RESUME_DATA } from '../../shared/components/cv-templates/mock-resume-data';
import { ResumeService } from '../../core/services/resume.service';
import { AuthService } from '../../core/auth/auth.service';
import { PaymentService } from '../../core/services/payment.service';
import { TemplateCategory } from '../../core/models/template.model';

type FilterOption = TemplateCategory | 'todos';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, CvPreviewComponent, PricingModalComponent],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent implements OnInit {
  private router         = inject(Router);
  private resumeService  = inject(ResumeService);
  private authService    = inject(AuthService);
  private paymentService = inject(PaymentService);

  readonly mockData      = MOCK_RESUME_DATA;
  readonly allTemplates  = TEMPLATE_LIST;
  readonly previewScale  = 0.605;

  activeFilter       = signal<FilterOption>('todos');
  showPricing        = signal(false);
  selectedTemplateId = signal<string | null>(null);
  unlockedTemplates  = this.paymentService.unlockedTemplates;

  readonly filters: { label: string; value: FilterOption }[] = [
    { label: 'Todos',       value: 'todos' },
    { label: 'Moderno',     value: 'moderno' },
    { label: 'Criativo',    value: 'criativo' },
    { label: 'Executivo',   value: 'executivo' },
    { label: 'Minimalista', value: 'minimalista' },
  ];

  filteredTemplates = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'todos') return this.allTemplates;
    return this.allTemplates.filter(t => t.category === filter);
  });

  isPro = computed(() => this.authService.user()?.plan === 'pro');

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.paymentService.loadUnlockedTemplates();
    }
  }

  isUnlocked(templateId: string): boolean {
    return this.isPro() || this.unlockedTemplates().includes(templateId);
  }

  setFilter(filter: FilterOption): void {
    this.activeFilter.set(filter);
  }

  selectTemplate(template: TemplateRegistryItem): void {
    if (template.isPremium && !this.isUnlocked(template.id)) {
      this.selectedTemplateId.set(template.id);
      this.showPricing.set(true);
      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/register']);
      return;
    }

    this.resumeService.setTemplate(template.id);
    this.router.navigate(['/editor']);
  }

  closePricing(): void {
    this.showPricing.set(false);
    this.selectedTemplateId.set(null);
  }
}
