import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-moderno-02',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#fff;font-family:'Arial',sans-serif;box-sizing:border-box;color:#333;position:relative;overflow:hidden">

      <!-- Geometric accent top-right -->
      <div style="position:absolute;top:0;right:0;width:200px;height:200px;background:#E8E8E8;clip-path:polygon(100% 0, 0 0, 100% 100%);z-index:0"></div>

      <!-- Header -->
      <div style="padding:28px 36px 20px;display:flex;gap:20px;align-items:flex-start;position:relative;z-index:1">
        <!-- Photo -->
        <div style="width:100px;height:100px;border-radius:50%;border:4px solid #E8E8E8;background:#F5F5F5;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center">
          @if (data.personalInfo.avatarUrl) {
            <img [src]="data.personalInfo.avatarUrl" style="width:100%;height:100%;object-fit:cover" />
          } @else {
            <span style="font-size:42px">👤</span>
          }
        </div>
        <!-- Name + summary -->
        <div style="flex:1">
          <h1 style="font-size:26px;font-weight:700;margin:0;color:#222;letter-spacing:0.5px">
            {{ data.personalInfo.fullName || 'Seu Nome' }}
          </h1>
          <p style="font-size:13px;color:#777;margin:4px 0 8px">{{ data.personalInfo.jobTitle || 'Cargo Desejado' }}</p>
          @if (data.personalInfo.about) {
            <p style="font-size:10px;line-height:1.6;margin:0;color:#666;max-width:320px">{{ data.personalInfo.about }}</p>
          }
        </div>
      </div>

      <!-- Divider -->
      <hr style="margin:0 36px 20px;border:none;border-top:1px solid #E0E0E0">

      <!-- Body: two columns -->
      <div style="display:flex;padding:0 0 28px;position:relative;z-index:1">

        <!-- Left: Formação + Cursos + Habilidades -->
        <div style="width:220px;flex-shrink:0;padding:0 24px 0 36px;display:flex;flex-direction:column;gap:18px">

          @if (data.education.length > 0) {
            <div>
              <h2 style="font-size:13px;font-weight:700;color:#333;margin:0 0 10px;border-left:3px solid #9E9E9E;padding-left:8px">Formação Acadêmica</h2>
              <div style="display:flex;flex-direction:column;gap:10px">
                @for (edu of data.education; track edu.id) {
                  <div>
                    <p style="font-size:11px;font-weight:700;margin:0">{{ edu.degree }}</p>
                    <p style="font-size:10px;color:#777;margin:1px 0">{{ edu.institution }}</p>
                    <p style="font-size:10px;color:#999;margin:0">{{ edu.startDate }}{{ edu.endDate ? ' – ' + edu.endDate : '' }}</p>
                    @if (edu.description) {
                      <p style="font-size:10px;color:#777;margin:2px 0 0;font-style:italic;line-height:1.5">{{ edu.description }}</p>
                    }
                  </div>
                }
              </div>
            </div>
          }

          @if (data.skills.length > 0) {
            <div>
              <h2 style="font-size:13px;font-weight:700;color:#333;margin:0 0 10px;border-left:3px solid #9E9E9E;padding-left:8px">Habilidades</h2>
              <ul style="margin:0;padding-left:14px;display:flex;flex-direction:column;gap:3px">
                @for (skill of data.skills; track skill.id) {
                  <li style="font-size:10px;color:#555">{{ skill.name }}</li>
                }
              </ul>
            </div>
          }

          @if (data.languages.length > 0) {
            <div>
              <h2 style="font-size:13px;font-weight:700;color:#333;margin:0 0 10px;border-left:3px solid #9E9E9E;padding-left:8px">Idiomas</h2>
              <div style="display:flex;flex-direction:column;gap:6px">
                @for (lang of data.languages; track lang.id) {
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
                      <span style="font-weight:600">{{ lang.name }}</span>
                      <span style="color:#888">{{ lang.level }}</span>
                    </div>
                    <div style="height:3px;background:#E0E0E0;border-radius:2px">
                      <div [style.width]="levelToWidth(lang.level)" style="height:100%;background:#9E9E9E;border-radius:2px"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>

        <!-- Right: Contact + Experiência -->
        <div style="flex:1;padding:0 36px 0 0;display:flex;flex-direction:column;gap:18px">

          <!-- Contact -->
          <div style="background:#F8F8F8;border-radius:8px;padding:12px 16px;display:flex;flex-direction:column;gap:5px">
            @if (data.personalInfo.phone) {
              <div style="display:flex;gap:8px;align-items:center;font-size:10px">
                <span style="color:#9E9E9E">📞</span><span>{{ data.personalInfo.phone }}</span>
              </div>
            }
            @if (data.personalInfo.email) {
              <div style="display:flex;gap:8px;align-items:center;font-size:10px">
                <span style="color:#9E9E9E">✉</span><span style="word-break:break-all">{{ data.personalInfo.email }}</span>
              </div>
            }
            @if (data.personalInfo.city) {
              <div style="display:flex;gap:8px;align-items:center;font-size:10px">
                <span style="color:#9E9E9E">📍</span><span>{{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}</span>
              </div>
            }
            @if (data.personalInfo.linkedIn) {
              <div style="display:flex;gap:8px;align-items:center;font-size:10px">
                <span style="color:#9E9E9E">🔗</span><span style="word-break:break-all">{{ data.personalInfo.linkedIn }}</span>
              </div>
            }
            @if (data.personalInfo.github) {
              <div style="display:flex;gap:8px;align-items:center;font-size:10px">
                <span style="color:#9E9E9E">💻</span><span style="word-break:break-all">{{ data.personalInfo.github }}</span>
              </div>
            }
            @if (data.personalInfo.portfolio) {
              <div style="display:flex;gap:8px;align-items:center;font-size:10px">
                <span style="color:#9E9E9E">🌐</span><span style="word-break:break-all">{{ data.personalInfo.portfolio }}</span>
              </div>
            }
          </div>

          <!-- Experiência -->
          @if (data.experiences.length > 0) {
            <div>
              <h2 style="font-size:13px;font-weight:700;color:#333;margin:0 0 12px;border-left:3px solid #9E9E9E;padding-left:8px">Experiência Profissional</h2>
              <div style="display:flex;flex-direction:column;gap:12px;position:relative">
                <div style="position:absolute;left:5px;top:6px;bottom:6px;width:1px;background:#E0E0E0"></div>
                @for (exp of data.experiences; track exp.id) {
                  <div style="display:flex;gap:14px;align-items:flex-start">
                    <div style="width:11px;height:11px;border-radius:50%;border:2px solid #9E9E9E;background:#fff;flex-shrink:0;margin-top:2px"></div>
                    <div>
                      <p style="font-size:10px;color:#999;margin:0 0 1px">{{ exp.startDate }}{{ exp.endDate ? ' – ' + exp.endDate : ' – Atual' }}</p>
                      <p style="font-size:12px;font-weight:700;margin:0">{{ exp.company }}</p>
                      <p style="font-size:10px;font-weight:600;color:#777;margin:1px 0">{{ exp.jobTitle }}</p>
                      @if (exp.description) {
                        <p style="font-size:10px;margin:3px 0 0;color:#777;line-height:1.5">{{ exp.description }}</p>
                      }
                      @if (exp.bullets && exp.bullets.length > 0) {
                        <ul style="margin:4px 0 0;padding-left:14px">
                          @for (bullet of exp.bullets; track bullet) {
                            <li style="font-size:10px;color:#777;line-height:1.6">{{ bullet }}</li>
                          }
                        </ul>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>
      </div>

      <!-- Geometric accent bottom-left -->
      <div style="position:absolute;bottom:0;left:0;width:160px;height:80px;background:#E8E8E8;clip-path:polygon(0 100%, 0 0, 100% 100%);z-index:0"></div>
    </div>
  `,
})
export class Moderno02Component {
  @Input() data!: ResumeData;

  levelToWidth(level: string): string {
    const map: Record<string, string> = {
      'básico': '25%', 'intermediário': '50%', 'avançado': '75%', 'fluente': '90%', 'nativo': '100%',
    };
    return map[level] ?? '50%';
  }
}
