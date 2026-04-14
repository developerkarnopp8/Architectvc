import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-minimalista-01',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#fff;font-family:'Georgia',serif;box-sizing:border-box;color:#1A1A2E">

      <!-- Gray header block -->
      <div style="background:#F2F2F2;padding:36px 44px 28px">
        <h1 style="font-size:42px;font-weight:900;margin:0;letter-spacing:-1px;line-height:1">
          {{ data.personalInfo.fullName || 'Seu Nome' }}
        </h1>
        <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:8px 0 0;color:#555;font-family:'Arial',sans-serif">
          {{ data.personalInfo.jobTitle || 'Cargo' }}
        </p>
        @if (data.personalInfo.about) {
          <p style="font-size:11px;line-height:1.7;margin:14px 0 0;color:#555;font-family:'Arial',sans-serif;max-width:400px">
            {{ data.personalInfo.about }}
          </p>
        }
      </div>

      <!-- Body: two-column -->
      <div style="display:flex;padding:28px 44px;gap:32px">

        <!-- Main: experiência + formação -->
        <div style="flex:1;display:flex;flex-direction:column;gap:22px">

          @if (data.experiences.length > 0) {
            <div>
              <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 14px;font-family:'Arial',sans-serif;border-bottom:2px solid #1A1A2E;padding-bottom:5px">
                EXPERIÊNCIA PROFISSIONAL
              </h2>
              <div style="display:flex;flex-direction:column;gap:14px">
                @for (exp of data.experiences; track exp.id) {
                  <div>
                    <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0;font-family:'Arial',sans-serif">{{ exp.company }}</p>
                    <p style="font-size:10.5px;font-style:italic;margin:2px 0;color:#555;font-family:'Arial',sans-serif">{{ exp.jobTitle }}</p>
                    <p style="font-size:10px;color:#888;margin:1px 0 4px;font-family:'Arial',sans-serif">
                      {{ exp.startDate }}{{ exp.endDate ? ' - ' + exp.endDate : ' - Atual' }}
                    </p>
                    @if (exp.description) {
                      <p style="font-size:10px;line-height:1.6;margin:0;color:#555;font-family:'Arial',sans-serif">{{ exp.description }}</p>
                    }
                    @if (exp.bullets && exp.bullets.length > 0) {
                      <ul style="margin:4px 0 0;padding-left:14px">
                        @for (bullet of exp.bullets; track bullet) {
                          <li style="font-size:10px;color:#555;line-height:1.6;font-family:'Arial',sans-serif">{{ bullet }}</li>
                        }
                      </ul>
                    }
                  </div>
                }
              </div>
            </div>
          }

          @if (data.education.length > 0) {
            <div>
              <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 14px;font-family:'Arial',sans-serif;border-bottom:2px solid #1A1A2E;padding-bottom:5px">
                HISTÓRICO ACADÊMICO
              </h2>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                @for (edu of data.education; track edu.id) {
                  <div>
                    <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0;font-family:'Arial',sans-serif">{{ edu.degree }}</p>
                    <p style="font-size:10px;color:#666;margin:2px 0;font-family:'Arial',sans-serif">{{ edu.institution }}</p>
                    <p style="font-size:10px;color:#888;margin:1px 0;font-family:'Arial',sans-serif">
                      {{ edu.startDate }}{{ edu.endDate ? ' – ' + edu.endDate : '' }}
                    </p>
                    @if (edu.description) {
                      <p style="font-size:10px;color:#777;margin:2px 0 0;font-style:italic;line-height:1.5;font-family:'Arial',sans-serif">{{ edu.description }}</p>
                    }
                  </div>
                }
              </div>
            </div>
          }

        </div>

        <!-- Sidebar: contato + habilidades -->
        <div style="width:150px;flex-shrink:0;display:flex;flex-direction:column;gap:20px">

          <div>
            <h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;font-family:'Arial',sans-serif">CONTATO</h2>
            <div style="display:flex;flex-direction:column;gap:6px;font-size:10px;color:#555;font-family:'Arial',sans-serif">
              @if (data.personalInfo.email) {
                <div class="cv-item" style="display:flex;gap:5px;align-items:flex-start">
                  <span style="flex-shrink:0">✉</span><span style="word-break:break-all">{{ data.personalInfo.email }}</span>
                </div>
              }
              @if (data.personalInfo.phone) {
                <div class="cv-item" style="display:flex;gap:5px"><span>📞</span>{{ data.personalInfo.phone }}</div>
              }
              @if (data.personalInfo.city) {
                <div class="cv-item" style="display:flex;gap:5px"><span>📍</span>{{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}</div>
              }
              @if (data.personalInfo.linkedIn) {
                <div class="cv-item" style="display:flex;gap:5px"><span>🔗</span><span style="word-break:break-all">{{ data.personalInfo.linkedIn }}</span></div>
              }
              @if (data.personalInfo.github) {
                <div class="cv-item" style="display:flex;gap:5px"><span>💻</span><span style="word-break:break-all">{{ data.personalInfo.github }}</span></div>
              }
              @if (data.personalInfo.portfolio) {
                <div class="cv-item" style="display:flex;gap:5px"><span>🌐</span><span style="word-break:break-all">{{ data.personalInfo.portfolio }}</span></div>
              }
            </div>
          </div>

          @if (data.skills.length > 0) {
            <div>
              <h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;font-family:'Arial',sans-serif">HABILIDADES</h2>
              <div style="display:flex;flex-direction:column;gap:4px;font-family:'Arial',sans-serif">
                @for (skill of data.skills; track skill.id) {
                  <p style="font-size:10px;margin:0;color:#444">{{ skill.name }}</p>
                }
              </div>
            </div>
          }

          @if (data.languages.length > 0) {
            <div>
              <h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;font-family:'Arial',sans-serif">IDIOMAS</h2>
              <div style="display:flex;flex-direction:column;gap:4px;font-family:'Arial',sans-serif">
                @for (lang of data.languages; track lang.id) {
                  <p style="font-size:10px;margin:0;color:#444">{{ lang.name }} – <em>{{ lang.level }}</em></p>
                }
              </div>
            </div>
          }

        </div>
      </div>

    </div>
  `,
})
export class Minimalista01Component {
  @Input() data!: ResumeData;
}
