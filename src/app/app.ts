import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  template: `
    <router-outlet />
    <app-toast />
  `,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.init();
  }
}
