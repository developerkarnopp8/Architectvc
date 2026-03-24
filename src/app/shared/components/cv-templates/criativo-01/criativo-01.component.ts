import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-criativo-01',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#fff;font-family:'Arial',sans-serif;padding:48px 52px;box-sizing:border-box;color:#111">

      <!-- Header -->
      <div style="margin-bottom:20px">
        <h1 style="font-size:48px;font-weight:900;letter-spacing:-1px;margin:0;text-transform:uppercase;line-height:1">
          {{ data.personalInfo.fullName || 'SEU NOME' }}
        </h1>
        <p style="font-size:16px;font-weight:400;margin:6px 0 0;color:#444">
          {{ data.personalInfo.jobTitle || 'Cargo Desejado' }}
        </p>
      </div>

      <hr style="border:none;border-top:2px solid #111;margin:16px 0">

      <!-- Contact row -->
      <div style="display:flex;gap:32px;margin-bottom:6px;align-items:center">
        <span style="display:flex;align-items:center;gap:6px;font-size:12px">
          <span style="font-size:16px">📞</span>{{ data.personalInfo.phone || '(12) 3456-7890' }}
        </span>
        <span style="display:flex;align-items:center;gap:6px;font-size:12px">
          <span style="font-size:16px">✉</span>{{ data.personalInfo.email || 'voce@email.com' }}
        </span>
        @if (data.personalInfo.city) {
          <span style="font-size:12px">📍 {{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}</span>
        }
      </div>

      <hr style="border:none;border-top:1.5px solid #111;margin:16px 0 24px">

      <!-- Objetivos -->
      @if (data.personalInfo.about) {
        <div style="margin-bottom:28px">
          <h2 style="font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px">OBJETIVOS</h2>
          <p style="font-size:11px;line-height:1.7;margin:0;color:#333">{{ data.personalInfo.about }}</p>
        </div>
      }

      <!-- Formação -->
      @if (data.education.length > 0) {
        <div style="margin-bottom:28px">
          <h2 style="font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">FORMAÇÃO</h2>
          <div style="display:flex;flex-direction:column;gap:12px">
            @for (edu of data.education; track edu.id) {
              <div style="display:flex;gap:16px">
                <span style="font-size:10px;color:#666;min-width:100px;padding-top:1px;flex-shrink:0">
                  {{ edu.startDate }}{{ edu.endDate ? ' - ' + edu.endDate : ' - Atual' }}
                </span>
                <div>
                  <p style="font-size:11px;font-weight:700;text-transform:uppercase;margin:0;letter-spacing:0.5px">{{ edu.institution }}</p>
                  <p style="font-size:11px;margin:2px 0 0;color:#444">{{ edu.degree }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Experiências -->
      @if (data.experiences.length > 0) {
        <div style="margin-bottom:28px">
          <h2 style="font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">EXPERIÊNCIAS</h2>
          <div style="display:flex;flex-direction:column;gap:16px">
            @for (exp of data.experiences; track exp.id) {
              <div style="display:flex;gap:16px">
                <span style="font-size:10px;color:#666;min-width:100px;padding-top:1px;flex-shrink:0">
                  {{ exp.startDate }}{{ exp.endDate ? ' - ' + exp.endDate : ' - Atual' }}
                </span>
                <div>
                  <p style="font-size:11px;font-weight:700;text-transform:uppercase;margin:0;letter-spacing:0.5px">{{ exp.company }}</p>
                  <p style="font-size:11px;margin:2px 0;color:#444;font-style:italic">{{ exp.jobTitle }}</p>
                  @if (exp.description) {
                    <p style="font-size:10px;margin:4px 0 0;color:#555;line-height:1.6">{{ exp.description }}</p>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Habilidades -->
      @if (data.skills.length > 0) {
        <div style="margin-bottom:28px">
          <h2 style="font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px">HABILIDADES</h2>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            @for (skill of data.skills; track skill.id) {
              <span style="font-size:10px;background:#f0f0f0;border:1px solid #ddd;padding:3px 10px;border-radius:20px">{{ skill.name }}</span>
            }
          </div>
        </div>
      }

      <!-- Idiomas -->
      @if (data.languages.length > 0) {
        <div>
          <h2 style="font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px">IDIOMAS</h2>
          <div style="display:flex;gap:20px;flex-wrap:wrap">
            @for (lang of data.languages; track lang.id) {
              <span style="font-size:11px"><strong>{{ lang.name }}</strong> – {{ lang.level }}</span>
            }
          </div>
        </div>
      }

    </div>
  `,
})
export class Criativo01Component {
  @Input() data!: ResumeData;
}
