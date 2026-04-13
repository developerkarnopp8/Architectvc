import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _counter = 0;
  toasts = signal<Toast[]>([]);

  show(type: ToastType, title: string, message?: string, durationMs = 4000): void {
    const id = ++this._counter;
    this.toasts.update(list => [...list, { id, type, title, message }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  success(title: string, message?: string) { this.show('success', title, message); }
  error(title: string, message?: string)   { this.show('error',   title, message); }
  info(title: string, message?: string)    { this.show('info',    title, message); }
  warning(title: string, message?: string) { this.show('warning', title, message); }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
