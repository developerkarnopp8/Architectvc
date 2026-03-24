import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ResumeApiService, ResumeListItem } from '../../core/services/resume-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <header class="mb-12 flex justify-between items-end">
        <div>
          <h1 class="font-headline text-4xl font-extrabold text-on-surface">Meus Currículos</h1>
          <p class="text-secondary mt-2 font-body">Gerencie e edite seus currículos salvos.</p>
        </div>
        <a routerLink="/templates"
           class="hero-gradient text-white px-6 py-3 rounded-xl font-bold font-label flex items-center gap-2 shadow-lg hover:opacity-90 transition-all">
          <span class="material-symbols-outlined">add</span>
          Novo Currículo
        </a>
      </header>

      @if (loading()) {
        <div class="text-center py-32">
          <span class="material-symbols-outlined text-4xl text-primary animate-spin block mb-4">progress_activity</span>
          <p class="text-secondary font-body">Carregando currículos...</p>
        </div>
      } @else if (resumes().length === 0) {
        <div class="text-center py-32">
          <span class="material-symbols-outlined text-8xl text-outline-variant mb-6 block">description</span>
          <h3 class="font-headline text-2xl font-bold text-on-surface mb-3">Nenhum currículo ainda</h3>
          <p class="text-secondary mb-8 font-body">Crie seu primeiro currículo e dê o próximo passo na sua carreira.</p>
          <a routerLink="/templates"
             class="inline-block hero-gradient text-white px-8 py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all">
            Começar Agora
          </a>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (resume of resumes(); track resume.id) {
            <div class="bg-white rounded-2xl shadow-editorial p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-headline text-lg font-bold text-on-surface">{{ resume.title }}</h3>
                  <p class="text-xs text-secondary font-label uppercase tracking-wider mt-1">{{ resume.templateId }}</p>
                </div>
                <span class="text-xs font-bold font-label px-3 py-1 rounded-full"
                  [class]="resume.status === 'complete'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'">
                  {{ resume.status === 'complete' ? 'Completo' : 'Rascunho' }}
                </span>
              </div>
              <p class="text-xs text-outline font-body">
                Atualizado {{ resume.updatedAt | date:'dd/MM/yyyy' }}
              </p>
              <div class="flex gap-3 mt-auto">
                <a [routerLink]="['/editor', resume.id]"
                   class="flex-1 text-center hero-gradient text-white py-2 rounded-xl font-bold font-label text-sm hover:opacity-90 transition-all">
                  Editar
                </a>
                <button (click)="remove(resume.id)"
                  class="px-4 py-2 rounded-xl font-label font-bold text-sm text-red-500 border border-red-200 hover:bg-red-50 transition-all">
                  <span class="material-symbols-outlined text-base leading-none">delete</span>
                </button>
              </div>
            </div>
          }
        </div>
      }
    </main>
    <app-footer />
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private resumeApi = inject(ResumeApiService);

  loading = signal(true);
  resumes = signal<ResumeListItem[]>([]);

  ngOnInit(): void {
    this.resumeApi.list().subscribe({
      next: (data) => { this.resumes.set(data); this.loading.set(false); },
      error: ()     => this.loading.set(false),
    });
  }

  remove(id: string): void {
    this.resumeApi.remove(id).subscribe(() =>
      this.resumes.update(list => list.filter(r => r.id !== id))
    );
  }
}
