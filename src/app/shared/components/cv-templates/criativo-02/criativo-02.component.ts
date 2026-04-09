import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-criativo-02',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#0D0D0D;font-family:'Arial',sans-serif;display:flex;box-sizing:border-box;color:#fff">

      <!-- Left sidebar -->
      <div style="width:220px;flex-shrink:0;padding:36px 24px;display:flex;flex-direction:column;gap:20px;background:#0D0D0D">

        <!-- Photo placeholder -->
        <div style="width:130px;height:130px;border-radius:50%;border:4px solid #ADFF2F;background:#1a1a1a;display:flex;align-items:center;justify-content:center;margin:0 auto">
          @if (data.personalInfo.avatarUrl) {
            <img [src]="data.personalInfo.avatarUrl" style="width:100%;height:100%;border-radius:50%;object-fit:cover" />
          } @else {
            <span style="font-size:40px;color:#555">👤</span>
          }
        </div>

        <!-- Name + title -->
        <div style="text-align:center">
          <h1 style="font-size:26px;font-weight:900;margin:0;line-height:1.1;text-transform:uppercase;word-break:break-word">
            {{ data.personalInfo.fullName || 'SEU NOME' }}
          </h1>
          <p style="font-size:10px;letter-spacing:3px;color:#ADFF2F;font-weight:700;text-transform:uppercase;margin:8px 0 0">
            {{ data.personalInfo.jobTitle || 'CARGO' }}
          </p>
        </div>

        <!-- Contact -->
        <div style="display:flex;flex-direction:column;gap:6px">
          @if (data.personalInfo.email) {
            <div style="display:flex;gap:8px;align-items:center;font-size:10px;color:#ccc">
              <span>✉</span><span style="word-break:break-all">{{ data.personalInfo.email }}</span>
            </div>
          }
          @if (data.personalInfo.phone) {
            <div style="display:flex;gap:8px;align-items:center;font-size:10px;color:#ccc">
              <span>📞</span><span>{{ data.personalInfo.phone }}</span>
            </div>
          }
          @if (data.personalInfo.city) {
            <div style="display:flex;gap:8px;align-items:center;font-size:10px;color:#ccc">
              <span>📍</span><span>{{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}</span>
            </div>
          }
          @if (data.personalInfo.linkedIn) {
            <div style="display:flex;gap:8px;align-items:center;font-size:10px;color:#ccc">
              <span>🔗</span><span style="word-break:break-all">{{ data.personalInfo.linkedIn }}</span>
            </div>
          }
          @if (data.personalInfo.github) {
            <div style="display:flex;gap:8px;align-items:center;font-size:10px;color:#ccc">
              <span>💻</span><span style="word-break:break-all">{{ data.personalInfo.github }}</span>
            </div>
          }
          @if (data.personalInfo.portfolio) {
            <div style="display:flex;gap:8px;align-items:center;font-size:10px;color:#ccc">
              <span>🌐</span><span style="word-break:break-all">{{ data.personalInfo.portfolio }}</span>
            </div>
          }
        </div>

        <!-- Sobre -->
        @if (data.personalInfo.about) {
          <div>
            <p style="font-size:11px;letter-spacing:3px;color:#ADFF2F;font-weight:700;text-transform:uppercase;margin:0 0 8px">SOBRE</p>
            <p style="font-size:10px;line-height:1.7;color:#bbb;margin:0">{{ data.personalInfo.about }}</p>
          </div>
        }

        <!-- Idiomas -->
        @if (data.languages.length > 0) {
          <div>
            <p style="font-size:11px;letter-spacing:3px;color:#ADFF2F;font-weight:700;text-transform:uppercase;margin:0 0 10px">IDIOMAS</p>
            <div style="display:flex;flex-direction:column;gap:8px">
              @for (lang of data.languages; track lang.id) {
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
                    <span style="font-weight:600">{{ lang.name }}</span>
                  </div>
                  <div style="height:3px;background:#333;border-radius:2px">
                    <div [style.width]="levelToWidth(lang.level)" style="height:100%;background:#ADFF2F;border-radius:2px"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Right content -->
      <div style="flex:1;padding:36px 28px;background:#1A1A1A;display:flex;flex-direction:column;gap:24px">

        <!-- Qualificações (Educação) -->
        @if (data.education.length > 0) {
          <div>
            <p style="font-size:12px;letter-spacing:3px;color:#ADFF2F;font-weight:700;text-transform:uppercase;margin:0 0 14px">QUALIFICAÇÕES</p>
            <div style="display:flex;flex-direction:column;gap:12px">
              @for (edu of data.education; track edu.id) {
                <div style="display:flex;gap:14px">
                  <span style="font-size:10px;color:#888;min-width:70px;padding-top:1px;flex-shrink:0;line-height:1.4">
                    {{ edu.startDate }}{{ edu.endDate ? ' - ' + edu.endDate : '' }}
                  </span>
                  <div>
                    <p style="font-size:11px;font-weight:700;margin:0;color:#fff">{{ edu.institution }}</p>
                    <p style="font-size:10px;margin:2px 0 0;color:#999">{{ edu.degree }}</p>
                    @if (edu.description) {
                      <p style="font-size:10px;margin:3px 0 0;color:#777;line-height:1.5;font-style:italic">{{ edu.description }}</p>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Experiência -->
        @if (data.experiences.length > 0) {
          <div>
            <p style="font-size:12px;letter-spacing:3px;color:#ADFF2F;font-weight:700;text-transform:uppercase;margin:0 0 14px">EXPERIÊNCIA</p>
            <div style="display:flex;flex-direction:column;gap:14px">
              @for (exp of data.experiences; track exp.id) {
                <div style="display:flex;gap:14px">
                  <span style="font-size:10px;color:#888;min-width:70px;padding-top:1px;flex-shrink:0;line-height:1.4">
                    {{ exp.startDate }}{{ exp.endDate ? ' - ' + exp.endDate : ' - Atual' }}
                  </span>
                  <div>
                    <p style="font-size:11px;font-weight:700;margin:0;color:#fff">{{ exp.company }}</p>
                    <p style="font-size:10px;margin:2px 0;color:#ADFF2F;font-style:italic">{{ exp.jobTitle }}</p>
                    @if (exp.description) {
                      <p style="font-size:10px;margin:4px 0 0;color:#888;line-height:1.6">{{ exp.description }}</p>
                    }
                    @if (exp.bullets && exp.bullets.length > 0) {
                      <ul style="margin:4px 0 0;padding-left:14px">
                        @for (bullet of exp.bullets; track bullet) {
                          <li style="font-size:10px;color:#888;line-height:1.6">{{ bullet }}</li>
                        }
                      </ul>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Habilidades -->
        @if (data.skills.length > 0) {
          <div>
            <p style="font-size:12px;letter-spacing:3px;color:#ADFF2F;font-weight:700;text-transform:uppercase;margin:0 0 10px">HABILIDADES</p>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              @for (skill of data.skills; track skill.id) {
                <span style="font-size:10px;border:1px solid #ADFF2F;color:#ADFF2F;padding:3px 10px;border-radius:20px">{{ skill.name }}</span>
              }
            </div>
          </div>
        }

      </div>
    </div>
  `,
})
export class Criativo02Component {
  @Input() data!: ResumeData;

  levelToWidth(level: string): string {
    const map: Record<string, string> = {
      'básico': '25%', 'intermediário': '50%', 'avançado': '75%', 'fluente': '90%', 'nativo': '100%',
    };
    return map[level] ?? '50%';
  }
}
