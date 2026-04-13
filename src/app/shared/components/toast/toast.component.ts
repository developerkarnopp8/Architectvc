import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
         aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-sm px-5 py-4 rounded-2xl shadow-glass border backdrop-blur-sm animate-slide-in"
          [class]="toastClasses(toast)">

          <!-- Icon -->
          <span class="material-symbols-outlined text-xl flex-shrink-0 mt-0.5"
                [class]="iconColor(toast)"
                style="font-variation-settings:'FILL' 1;">
            {{ toastIcon(toast) }}
          </span>

          <!-- Text -->
          <div class="flex-1 min-w-0">
            <p class="font-label font-bold text-sm text-on-surface">{{ toast.title }}</p>
            @if (toast.message) {
              <p class="text-xs text-secondary mt-0.5 font-body">{{ toast.message }}</p>
            }
          </div>

          <!-- Close -->
          <button (click)="toastService.dismiss(toast.id)"
                  class="text-secondary hover:text-on-surface transition-colors flex-shrink-0 -mr-1 -mt-1 p-1">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { opacity: 0; transform: translateX(100%); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in { animation: slide-in 0.25s ease-out; }
  `],
})
export class ToastComponent {
  toastService = inject(ToastService);

  toastClasses(toast: Toast): string {
    const base = 'bg-surface-container-high border-outline-variant/30';
    const map: Record<string, string> = {
      success: 'bg-surface-container-high border-primary/40',
      error:   'bg-surface-container-high border-error/40',
      info:    'bg-surface-container-high border-outline-variant/30',
      warning: 'bg-surface-container-high border-primary/30',
    };
    return map[toast.type] ?? base;
  }

  toastIcon(toast: Toast): string {
    const map: Record<string, string> = {
      success: 'check_circle',
      error:   'error',
      info:    'info',
      warning: 'warning',
    };
    return map[toast.type] ?? 'info';
  }

  iconColor(toast: Toast): string {
    const map: Record<string, string> = {
      success: 'text-primary',
      error:   'text-error',
      info:    'text-secondary',
      warning: 'text-primary',
    };
    return map[toast.type] ?? 'text-secondary';
  }
}
