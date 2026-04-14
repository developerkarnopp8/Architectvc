import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, CookieConsentComponent],
  template: `
    <router-outlet />
    <app-toast />
    <app-cookie-consent />
  `,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.init();
  }
}
