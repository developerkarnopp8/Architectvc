import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
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
      <!-- Empty state -->
      <div class="text-center py-32">
        <span class="material-symbols-outlined text-8xl text-outline-variant mb-6 block">description</span>
        <h3 class="font-headline text-2xl font-bold text-on-surface mb-3">Nenhum currículo ainda</h3>
        <p class="text-secondary mb-8 font-body">Crie seu primeiro currículo e dê o próximo passo na sua carreira.</p>
        <a routerLink="/templates"
           class="inline-block hero-gradient text-white px-8 py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all">
          Começar Agora
        </a>
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
