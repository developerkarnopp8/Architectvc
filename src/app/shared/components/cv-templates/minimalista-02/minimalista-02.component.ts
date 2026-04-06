import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-minimalista-02',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#F7F7F7;font-family:'Arial',sans-serif;box-sizing:border-box;color:#222;display:flex;flex-direction:column">

      <!-- Header accent + name -->
      <div style="padding:0;position:relative;margin-bottom:0">
        <div style="width:180px;height:14px;background:#888;margin-bottom:0"></div>
        <div style="padding:20px 44px 16px;text-align:center">
          <h1 style="font-size:32px;font-weight:400;letter-spacing:8px;text-transform:uppercase;margin:0">
            <span style="font-weight:300">{{ firstName }}</span><strong style="font-weight:900">{{ lastName }}</strong>
          </h1>
          <div style="width:80px;height:1px;background:#888;margin:10px auto 8px"></div>
          <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;color:#666">
            {{ data.personalInfo.jobTitle || 'CARGO' }}
          </p>
        </div>
      </div>

      <!-- Two-column body -->
      <div style="display:flex;flex:1">

        <!-- Left sidebar -->
        <div style="width:200px;flex-shrink:0;background:#EBEBEB;padding:24px 22px;display:flex;flex-direction:column;gap:20px">

          <div>
            <h2 style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #CCC;padding-bottom:4px">CONTATO</h2>
            <div style="display:flex;flex-direction:column;gap:5px;font-size:9.5px;color:#555">
              @if (data.personalInfo.phone) {
                <span>📞 {{ data.personalInfo.phone }}</span>
              }
              @if (data.personalInfo.email) {
                <span style="word-break:break-all">✉ {{ data.personalInfo.email }}</span>
              }
              @if (data.personalInfo.city) {
                <span>📍 {{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}</span>
              }
              @if (data.personalInfo.portfolio) {
                <span>🌐 {{ data.personalInfo.portfolio }}</span>
              }
              @if (data.personalInfo.linkedIn) {
                <span style="word-break:break-all">🔗 {{ data.personalInfo.linkedIn }}</span>
              }
              @if (data.personalInfo.github) {
                <span style="word-break:break-all">💻 {{ data.personalInfo.github }}</span>
              }
            </div>
          </div>

          @if (data.skills.length > 0) {
            <div>
              <h2 style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #CCC;padding-bottom:4px">HABILIDADES</h2>
              <div style="display:flex;flex-direction:column;gap:6px">
                @for (skill of data.skills; track skill.id) {
                  <div>
                    <p style="font-size:10px;font-weight:700;margin:0 0 2px">{{ skill.name }}</p>
                  </div>
                }
              </div>
            </div>
          }

          @if (data.languages.length > 0) {
            <div>
              <h2 style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #CCC;padding-bottom:4px">IDIOMAS</h2>
              <div style="display:flex;flex-direction:column;gap:6px">
                @for (lang of data.languages; track lang.id) {
                  <div>
                    <p style="font-size:10px;margin:0 0 3px">{{ lang.name }}: <em>{{ lang.level }}</em></p>
                    <div style="height:3px;background:#CCC;border-radius:2px">
                      <div [style.width]="levelToWidth(lang.level)" style="height:100%;background:#888;border-radius:2px"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>

        <!-- Right content -->
        <div style="flex:1;padding:24px 28px;display:flex;flex-direction:column;gap:20px">

          @if (data.personalInfo.about) {
            <div>
              <h2 style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 8px;border-bottom:1px solid #CCC;padding-bottom:4px">OBJETIVO PROFISSIONAL</h2>
              <p style="font-size:10px;line-height:1.7;margin:0;color:#444">{{ data.personalInfo.about }}</p>
            </div>
          }

          @if (data.education.length > 0) {
            <div>
              <h2 style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #CCC;padding-bottom:4px">FORMAÇÃO ACADÊMICA</h2>
              <div style="display:flex;flex-direction:column;gap:8px">
                @for (edu of data.education; track edu.id) {
                  <div>
                    <p style="font-size:10.5px;margin:0">{{ edu.degree }}</p>
                    <div style="display:flex;gap:8px;margin-top:1px">
                      <span style="font-size:10px;font-weight:700;color:#555">{{ edu.startDate }}{{ edu.endDate ? ' – ' + edu.endDate : '' }}</span>
                      <span style="font-size:10px;color:#777">• {{ edu.institution }}</span>
                    </div>
                    @if (edu.description) {
                      <p style="font-size:10px;color:#777;margin:2px 0 0;font-style:italic;line-height:1.5">{{ edu.description }}</p>
                    }
                  </div>
                }
              </div>
            </div>
          }

          @if (data.experiences.length > 0) {
            <div>
              <h2 style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#888;margin:0 0 10px;border-bottom:1px solid #CCC;padding-bottom:4px">EXPERIÊNCIA PROFISSIONAL</h2>
              <div style="display:flex;flex-direction:column;gap:10px">
                @for (exp of data.experiences; track exp.id) {
                  <div>
                    <p style="font-size:10.5px;margin:0">{{ exp.company }}</p>
                    <div style="display:flex;gap:8px;margin-top:1px">
                      <span style="font-size:10px;font-weight:700;color:#555">{{ exp.startDate }}{{ exp.endDate ? ' – ' + exp.endDate : ' – Atual' }}</span>
                      <span style="font-size:10px;color:#777">• {{ exp.jobTitle }}</span>
                    </div>
                    @if (exp.description) {
                      <p style="font-size:10px;color:#555;line-height:1.6;margin:3px 0 0">{{ exp.description }}</p>
                    }
                    @if (exp.bullets && exp.bullets.length > 0) {
                      <ul style="margin:4px 0 0;padding-left:14px">
                        @for (bullet of exp.bullets; track bullet) {
                          <li style="font-size:10px;color:#555;line-height:1.6">{{ bullet }}</li>
                        }
                      </ul>
                    }
                  </div>
                }
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  `,
})
export class Minimalista02Component {
  @Input() data!: ResumeData;

  get firstName(): string {
    const parts = (this.data?.personalInfo?.fullName || 'SEU').split(' ');
    return parts.slice(0, -1).join(' ') || parts[0];
  }

  get lastName(): string {
    const parts = (this.data?.personalInfo?.fullName || 'NOME').split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  levelToWidth(level: string): string {
    const map: Record<string, string> = {
      'básico': '25%', 'intermediário': '50%', 'avançado': '75%', 'fluente': '90%', 'nativo': '100%',
    };
    return map[level] ?? '50%';
  }
}
