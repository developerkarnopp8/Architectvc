import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Resume, ResumeData } from '../models/resume.model';

export interface ResumeListItem {
  id: string;
  title: string;
  templateId: string;
  status: 'draft' | 'complete';
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumePayload {
  title?: string;
  templateId: string;
  data: ResumeData;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class ResumeApiService {
  private api = inject(ApiService);

  list() {
    return this.api.get<ResumeListItem[]>('/resumes');
  }

  get(id: string) {
    return this.api.get<Resume>(`/resumes/${id}`);
  }

  create(payload: CreateResumePayload) {
    return this.api.post<Resume>('/resumes', payload);
  }

  update(id: string, payload: Partial<CreateResumePayload>) {
    return this.api.patch<Resume>(`/resumes/${id}`, payload);
  }

  remove(id: string) {
    return this.api.delete<{ message: string }>(`/resumes/${id}`);
  }
}
