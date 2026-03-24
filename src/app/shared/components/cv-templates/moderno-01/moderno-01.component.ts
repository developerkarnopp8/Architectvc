import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-moderno-01',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#fff;font-family:'Arial',sans-serif;box-sizing:border-box;color:#222">

      <!-- Header -->
      <div style="padding:36px 44px 0;display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <h1 style="font-size:36px;font-weight:900;color:#C62A72;margin:0;line-height:1;text-transform:uppercase;letter-spacing:-0.5px">
            {{ data.personalInfo.fullName || 'SEU NOME' }}
          </h1>
          <p style="font-size:14px;color:#555;font-weight:400;margin:6px 0 0">
            {{ data.personalInfo.jobTitle || 'Cargo Desejado' }}
          </p>
        </div>
        <div style="text-align:right;font-size:10px;color:#555;line-height:2;display:flex;flex-direction:column;align-items:flex-end;gap:1px">
          @if (data.personalInfo.phone) {
            <span style="display:flex;align-items:center;gap:4px">{{ data.personalInfo.phone }} <span style="color:#C62A72">📞</span></span>
          }
          @if (data.personalInfo.city) {
            <span style="display:flex;align-items:center;gap:4px">
              {{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }} <span style="color:#C62A72">📍</span>
            </span>
          }
          @if (data.personalInfo.email) {
            <span style="display:flex;align-items:center;gap:4px">{{ data.personalInfo.email }} <span style="color:#C62A72">✉</span></span>
          }
          @if (data.personalInfo.linkedIn) {
            <span style="display:flex;align-items:center;gap:4px">{{ data.personalInfo.linkedIn }} <span style="color:#C62A72">🔗</span></span>
          }
        </div>
      </div>

      <div style="padding:24px 44px;display:flex;flex-direction:column;gap:0">

        <!-- Sobre Mim -->
        @if (data.personalInfo.about) {
          <div style="margin-bottom:20px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
              <div style="width:12px;height:12px;border-radius:50%;background:#C62A72;flex-shrink:0"></div>
              <h2 style="font-size:14px;font-weight:700;color:#C62A72;text-transform:uppercase;letter-spacing:1px;margin:0">SOBRE MIM</h2>
            </div>
            <p style="font-size:10.5px;line-height:1.7;margin:0 0 0 22px;color:#444">{{ data.personalInfo.about }}</p>
          </div>
        }

        <!-- Experiência -->
        @if (data.experiences.length > 0) {
          <div style="margin-bottom:20px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <div style="width:12px;height:12px;border-radius:50%;background:#C62A72;flex-shrink:0"></div>
              <h2 style="font-size:14px;font-weight:700;color:#C62A72;text-transform:uppercase;letter-spacing:1px;margin:0">EXPERIÊNCIA</h2>
            </div>
            <div style="margin-left:22px;display:flex;flex-direction:column;gap:14px">
              @for (exp of data.experiences; track exp.id) {
                <div>
                  <p style="font-size:11.5px;font-weight:700;margin:0">{{ exp.company }} – <span style="font-style:italic">{{ exp.jobTitle }}</span></p>
                  <p style="font-size:10px;color:#C62A72;font-style:italic;margin:2px 0">
                    {{ exp.startDate }}{{ exp.endDate ? ' – ' + exp.endDate : ' – Atual' }}
                  </p>
                  @if (exp.description) {
                    <p style="font-size:10px;margin:4px 0 0;color:#555;line-height:1.6">{{ exp.description }}</p>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Educação -->
        @if (data.education.length > 0) {
          <div style="margin-bottom:20px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <div style="width:12px;height:12px;border-radius:50%;background:#C62A72;flex-shrink:0"></div>
              <h2 style="font-size:14px;font-weight:700;color:#C62A72;text-transform:uppercase;letter-spacing:1px;margin:0">EDUCAÇÃO</h2>
            </div>
            <div style="margin-left:22px;display:flex;flex-direction:column;gap:8px">
              @for (edu of data.education; track edu.id) {
                <div>
                  <p style="font-size:11px;font-weight:700;margin:0">{{ edu.degree }}</p>
                  <p style="font-size:10px;color:#777;font-style:italic;margin:1px 0">
                    {{ edu.startDate }}{{ edu.endDate ? ' – ' + edu.endDate : '' }} • {{ edu.institution }}
                  </p>
                </div>
              }
            </div>
          </div>
        }

        <!-- Habilidades -->
        @if (data.skills.length > 0) {
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <div style="width:12px;height:12px;border-radius:50%;background:#C62A72;flex-shrink:0"></div>
              <h2 style="font-size:14px;font-weight:700;color:#C62A72;text-transform:uppercase;letter-spacing:1px;margin:0">HABILIDADES</h2>
            </div>
            <div style="margin-left:22px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px 12px">
              @for (skill of data.skills; track skill.id) {
                <p style="font-size:10px;margin:0;color:#444">• {{ skill.name }}</p>
              }
            </div>
          </div>
        }

      </div>
    </div>
  `,
})
export class Moderno01Component {
  @Input() data!: ResumeData;
}
