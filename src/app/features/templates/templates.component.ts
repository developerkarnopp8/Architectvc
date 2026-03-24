import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CvPreviewComponent } from '../../shared/components/cv-templates/cv-preview/cv-preview.component';
import { TEMPLATE_LIST, TemplateRegistryItem } from '../../shared/components/cv-templates/template-registry';
import { MOCK_RESUME_DATA } from '../../shared/components/cv-templates/mock-resume-data';
import { ResumeService } from '../../core/services/resume.service';
import { TemplateCategory } from '../../core/models/template.model';

type FilterOption = TemplateCategory | 'todos';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, CvPreviewComponent],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent {
  private router = inject(Router);
  private resumeService = inject(ResumeService);

  readonly mockData = MOCK_RESUME_DATA;
  readonly allTemplates = TEMPLATE_LIST;
  // Scale to fit the A4 (595px) preview inside the grid card (~360px wide)
  readonly previewScale = 0.605;

  activeFilter = signal<FilterOption>('todos');

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

  setFilter(filter: FilterOption): void {
    this.activeFilter.set(filter);
  }

  selectTemplate(template: TemplateRegistryItem): void {
    this.resumeService.setTemplate(template.id);
    this.router.navigate(['/editor']);
  }
}
