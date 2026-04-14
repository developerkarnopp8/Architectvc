import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-executivo-01',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;background:#fff;font-family:'Arial',sans-serif;box-sizing:border-box;color:#2D2D2D">

      <!-- Header unificado com fundo cinza -->
      <div class="cv-section" style="background:#F2F2F2;padding:32px 44px 20px">
        <h1 style="font-size:36px;font-weight:900;letter-spacing:1px;margin:0;text-transform:uppercase">
          {{ data.personalInfo.fullName || 'SEU NOME' }}
        </h1>
        <p style="font-size:11px;letter-spacing:4px;color:#666;font-weight:400;margin:5px 0 12px;text-transform:uppercase">
          {{ data.personalInfo.jobTitle || 'Cargo Desejado' }}
        </p>

        <!-- Contatos dentro do cabeçalho -->
        <div style="display:flex;gap:18px;flex-wrap:wrap;border-top:1px solid #D8D8D8;padding-top:12px">
          @if (data.personalInfo.phone) {
            <span style="font-size:10px;display:flex;align-items:center;gap:5px;color:#555">📞 {{ data.personalInfo.phone }}</span>
          }
          @if (data.personalInfo.email) {
            <span style="font-size:10px;display:flex;align-items:center;gap:5px;color:#555">✉ {{ data.personalInfo.email }}</span>
          }
          @if (data.personalInfo.city) {
            <span style="font-size:10px;display:flex;align-items:center;gap:5px;color:#555">📍 {{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}</span>
          }
          @if (data.personalInfo.linkedIn) {
            <span style="font-size:10px;display:flex;align-items:center;gap:5px;color:#555">🔗 {{ data.personalInfo.linkedIn }}</span>
          }
          @if (data.personalInfo.github) {
            <span style="font-size:10px;display:flex;align-items:center;gap:5px;color:#555">💻 {{ data.personalInfo.github }}</span>
          }
          @if (data.personalInfo.portfolio) {
            <span style="font-size:10px;display:flex;align-items:center;gap:5px;color:#555">🌐 {{ data.personalInfo.portfolio }}</span>
          }
        </div>
      </div>

      <!-- Sobre -->
      @if (data.personalInfo.about) {
        <div class="cv-section" style="padding:18px 44px 0">
          <p style="font-size:10.5px;line-height:1.7;margin:0;color:#444">{{ data.personalInfo.about }}</p>
        </div>
      }

      <div style="padding:20px 44px;display:flex;flex-direction:column;gap:20px">

        <!-- Habilidades -->
        @if (data.skills.length > 0) {
          <div class="cv-section">
            <h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #E0E0E0;padding-bottom:6px">HABILIDADES</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px 8px">
              @for (skill of data.skills; track skill.id) {
                <div style="display:flex;align-items:center;gap:5px;font-size:10px">
                  <span style="width:5px;height:5px;border-radius:50%;background:#888;flex-shrink:0"></span>
                  {{ skill.name }}
                </div>
              }
            </div>
          </div>
        }

        <!-- Experiência -->
        @if (data.experiences.length > 0) {
          <div class="cv-section">
            <h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 12px;border-bottom:1px solid #E0E0E0;padding-bottom:6px">EXPERIÊNCIA PROFISSIONAL</h2>
            <div style="display:flex;flex-direction:column;gap:14px">
              @for (exp of data.experiences; track exp.id) {
                <div class="cv-item" style="display:flex;gap:12px">
                  <div style="width:4px;flex-shrink:0;background:#D0D0D0;border-radius:2px;margin-top:2px"></div>
                  <div style="flex:1">
                    <p style="font-size:12px;font-weight:700;margin:0">{{ exp.company }}</p>
                    <p style="font-size:10px;color:#666;margin:2px 0 0;font-style:italic">
                      {{ exp.jobTitle }} • {{ exp.startDate }}{{ exp.endDate ? ' – ' + exp.endDate : ' – Atual' }}
                    </p>
                    @if (exp.description) {
                      <p style="font-size:10px;margin:5px 0 0;color:#555;line-height:1.6">{{ exp.description }}</p>
                    }
                    @if (exp.bullets && exp.bullets.length > 0) {
                      <ul style="margin:4px 0 0;padding-left:14px">
                        @for (bullet of exp.bullets; track bullet) {
                          <li style="font-size:10px;color:#555;line-height:1.6">{{ bullet }}</li>
                        }
                      </ul>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Formação -->
        @if (data.education.length > 0) {
          <div class="cv-section">
            <h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 12px;border-bottom:1px solid #E0E0E0;padding-bottom:6px">FORMAÇÃO ACADÊMICA</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              @for (edu of data.education; track edu.id) {
                <div class="cv-item">
                  <p style="font-size:11px;font-weight:700;margin:0">{{ edu.degree }}</p>
                  <p style="font-size:10px;color:#666;margin:2px 0;font-style:italic">{{ edu.institution }} • {{ edu.startDate }}{{ edu.endDate ? ' – ' + edu.endDate : '' }}</p>
                  @if (edu.description) {
                    <p style="font-size:10px;color:#777;margin:3px 0 0;font-style:italic">{{ edu.description }}</p>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Idiomas -->
        @if (data.languages.length > 0) {
          <div class="cv-section">
            <h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #E0E0E0;padding-bottom:6px">IDIOMAS</h2>
            <div style="display:flex;gap:24px;flex-wrap:wrap">
              @for (lang of data.languages; track lang.id) {
                <div class="cv-item">
                  <p style="font-size:11px;font-weight:700;margin:0">{{ lang.name }}</p>
                  <p style="font-size:10px;color:#777;margin:1px 0 0;font-style:italic">{{ lang.level }}</p>
                  <div style="width:80px;height:3px;background:#E0E0E0;border-radius:2px;margin-top:4px">
                    <div [style.width]="levelToWidth(lang.level)" style="height:100%;background:#888;border-radius:2px"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

      </div>
    </div>
  `,
})
export class Executivo01Component {
  @Input() data!: ResumeData;

  levelToWidth(level: string): string {
    const map: Record<string, string> = {
      'básico': '25%', 'intermediário': '50%', 'avançado': '75%', 'fluente': '90%', 'nativo': '100%',
    };
    return map[level] ?? '50%';
  }
}
