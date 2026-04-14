import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-privacidade',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="pt-32 pb-24 px-6 max-w-3xl mx-auto">

      <div class="mb-10">
        <h1 class="font-headline text-4xl font-extrabold text-primary mb-3">Política de Privacidade</h1>
        <p class="text-secondary font-body text-sm">Última atualização: abril de 2026</p>
      </div>

      <div class="space-y-8 text-on-surface font-body text-sm leading-relaxed">

        <section>
          <h2 class="text-lg font-bold text-on-surface mb-3 font-label">1. Quais dados coletamos</h2>
          <p>Coletamos apenas os dados necessários para o funcionamento da plataforma:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-secondary">
            <li>Nome e e-mail fornecidos no cadastro</li>
            <li>Dados do currículo preenchidos no editor</li>
            <li>Informações de pagamento processadas pelo Stripe (não armazenamos dados de cartão)</li>
            <li>Cookies de sessão para manter você autenticado</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-on-surface mb-3 font-label">2. Como usamos seus dados</h2>
          <ul class="list-disc list-inside space-y-1 text-secondary">
            <li>Criar e gerenciar sua conta</li>
            <li>Salvar e recuperar seus currículos</li>
            <li>Processar pagamentos com segurança</li>
            <li>Melhorar a experiência da plataforma</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-on-surface mb-3 font-label">3. Cookies</h2>
          <p>Usamos cookies para:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-secondary">
            <li><strong class="text-on-surface">Sessão:</strong> manter você autenticado entre visitas</li>
            <li><strong class="text-on-surface">Preferências:</strong> salvar configurações locais do editor</li>
            <li><strong class="text-on-surface">Análise:</strong> entender como a plataforma é utilizada (dados agregados e anônimos)</li>
          </ul>
          <p class="mt-3">Você pode recusar cookies não essenciais pelo banner de consentimento. Isso não afeta o funcionamento principal da plataforma.</p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-on-surface mb-3 font-label">4. Compartilhamento de dados</h2>
          <p>Não vendemos seus dados. Compartilhamos apenas com:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-secondary">
            <li><strong class="text-on-surface">Stripe:</strong> processamento de pagamentos</li>
            <li><strong class="text-on-surface">Servidor próprio:</strong> armazenamento seguro dos currículos</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-on-surface mb-3 font-label">5. Seus direitos</h2>
          <p>Você pode a qualquer momento:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-secondary">
            <li>Acessar os dados que temos sobre você</li>
            <li>Solicitar a exclusão da sua conta e dados</li>
            <li>Exportar seus currículos em PDF</li>
          </ul>
          <p class="mt-3">Para exercer esses direitos, entre em contato pelo e-mail
            <a href="mailto:contato@architectvc.com" class="text-primary hover:underline">contato@architectvc.com</a>.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-on-surface mb-3 font-label">6. Segurança</h2>
          <p>Seus dados são armazenados com criptografia e comunicações protegidas por HTTPS. Senhas são armazenadas com hash bcrypt.</p>
        </section>

      </div>

      <div class="mt-12">
        <a routerLink="/" class="text-primary font-bold font-label hover:underline text-sm">← Voltar para o início</a>
      </div>

    </main>
    <app-footer />
  `,
})
export class PrivacidadeComponent {}
