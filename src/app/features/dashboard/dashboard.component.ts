import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ResumeApiService, ResumeListItem } from '../../core/services/resume-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, FormsModule],
  template: `
    <app-navbar />

    <!-- Confirm delete modal -->
    @if (confirmDeleteId()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="cancelDelete()"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full z-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-red-100 p-3 rounded-xl">
              <span class="material-symbols-outlined text-red-500" style="font-variation-settings:'FILL' 1;">warning</span>
            </div>
            <h3 class="font-headline text-lg font-bold text-on-surface">Excluir currículo?</h3>
          </div>
          <p class="text-secondary font-body text-sm mb-6">Esta ação é permanente e não pode ser desfeita. Tem certeza?</p>
          <div class="flex gap-3">
            <button (click)="cancelDelete()"
              class="flex-1 py-3 rounded-xl font-bold font-label bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all">
              Cancelar
            </button>
            <button (click)="confirmDelete()"
              class="flex-1 py-3 rounded-xl font-bold font-label bg-red-500 text-white hover:bg-red-600 transition-all">
              Excluir
            </button>
          </div>
        </div>
      </div>
    }

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

  loading         = signal(true);
  resumes         = signal<ResumeListItem[]>([]);
  confirmDeleteId = signal<string | null>(null);

  ngOnInit(): void {
    this.resumeApi.list().subscribe({
      next: (data) => { this.resumes.set(data); this.loading.set(false); },
      error: ()     => this.loading.set(false),
    });
  }

  remove(id: string): void {
    this.confirmDeleteId.set(id);
  }

  cancelDelete(): void {
    this.confirmDeleteId.set(null);
  }

  confirmDelete(): void {
    const id = this.confirmDeleteId();
    if (!id) return;
    this.confirmDeleteId.set(null);
    this.resumeApi.remove(id).subscribe({
      next: () => this.resumes.update(list => list.filter(r => r.id !== id)),
      error: () => alert('Erro ao excluir. Tente novamente.'),
    });
  }
}
