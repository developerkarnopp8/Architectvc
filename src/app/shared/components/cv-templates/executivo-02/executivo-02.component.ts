import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../../../core/models';

@Component({
  selector: 'app-cv-executivo-02',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:595px;min-height:842px;background:#fff;font-family:'Arial',sans-serif;box-sizing:border-box;color:#222">

      <!-- Header -->
      <div style="padding:32px 40px 24px;display:flex;gap:20px;align-items:flex-start">
        <!-- Photo -->
        <div style="width:90px;height:90px;border-radius:50%;border:3px solid #E8E8E8;background:#F5F5F5;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center">
          @if (data.personalInfo.avatarUrl) {
            <img [src]="data.personalInfo.avatarUrl" style="width:100%;height:100%;object-fit:cover" />
          } @else {
            <span style="font-size:36px">👤</span>
          }
        </div>
        <!-- Name + address -->
        <div style="flex:1">
          <h1 style="font-size:28px;font-weight:900;color:#3B5FC0;margin:0">{{ data.personalInfo.fullName || 'SEU NOME' }}</h1>
          @if (data.personalInfo.city) {
            <p style="font-size:11px;color:#555;margin:4px 0 0">
              {{ data.personalInfo.city }}{{ data.personalInfo.state ? ', ' + data.personalInfo.state : '' }}
            </p>
          }
          @if (data.personalInfo.jobTitle) {
            <p style="font-size:12px;color:#3B5FC0;font-weight:600;margin:4px 0 0">{{ data.personalInfo.jobTitle }}</p>
          }
        </div>
        <!-- Contact -->
        <div style="text-align:right;font-size:10px;color:#555;line-height:1.8">
          @if (data.personalInfo.phone) { <p style="margin:0">{{ data.personalInfo.phone }}</p> }
          @if (data.personalInfo.email) { <p style="margin:0">{{ data.personalInfo.email }}</p> }
          @if (data.personalInfo.portfolio) { <p style="margin:0">{{ data.personalInfo.portfolio }}</p> }
          @if (data.personalInfo.linkedIn) { <p style="margin:0">{{ data.personalInfo.linkedIn }}</p> }
        </div>
      </div>

      <div style="padding:0 40px 32px;display:grid;grid-template-columns:1fr 1fr;gap:20px 32px">

        <!-- Sobre Mim -->
        @if (data.personalInfo.about) {
          <div>
            <h2 style="font-size:12px;font-weight:700;color:#3B5FC0;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;border-bottom:2px solid #3B5FC0;padding-bottom:4px">SOBRE MIM</h2>
            <p style="font-size:10px;line-height:1.7;margin:0;color:#444">{{ data.personalInfo.about }}</p>
          </div>
        }

        <!-- Carreira -->
        @if (data.experiences.length > 0) {
          <div>
            <h2 style="font-size:12px;font-weight:700;color:#3B5FC0;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;border-bottom:2px solid #3B5FC0;padding-bottom:4px">CARREIRA</h2>
            <div style="display:flex;flex-direction:column;gap:10px">
              @for (exp of data.experiences; track exp.id) {
                <div>
                  <p style="font-size:11px;font-weight:700;margin:0">{{ exp.jobTitle }}</p>
                  <p style="font-size:10px;font-weight:700;margin:1px 0">{{ exp.company }}</p>
                  <p style="font-size:10px;color:#666;margin:1px 0">
                    {{ exp.startDate }}{{ exp.endDate ? ' - ' + exp.endDate : ' - Atual' }}
                  </p>
                  @if (exp.description) {
                    <p style="font-size:10px;margin:3px 0 0;color:#555;line-height:1.5">{{ exp.description }}</p>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Habilidades -->
        @if (data.skills.length > 0) {
          <div>
            <h2 style="font-size:12px;font-weight:700;color:#3B5FC0;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;border-bottom:2px solid #3B5FC0;padding-bottom:4px">HABILIDADES</h2>
            <ul style="margin:0;padding-left:16px;display:flex;flex-direction:column;gap:3px">
              @for (skill of data.skills; track skill.id) {
                <li style="font-size:10px;color:#333">{{ skill.name }}</li>
              }
            </ul>
          </div>
        }

        <!-- Escolaridade -->
        @if (data.education.length > 0) {
          <div>
            <h2 style="font-size:12px;font-weight:700;color:#3B5FC0;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;border-bottom:2px solid #3B5FC0;padding-bottom:4px">ESCOLARIDADE</h2>
            <div style="display:flex;flex-direction:column;gap:10px">
              @for (edu of data.education; track edu.id) {
                <div>
                  <p style="font-size:10px;font-weight:700;margin:0">{{ edu.institution }}</p>
                  <p style="font-size:10px;margin:1px 0">{{ edu.degree }}</p>
                  <p style="font-size:10px;color:#666;margin:1px 0">{{ edu.startDate }}{{ edu.endDate ? ' – ' + edu.endDate : '' }}</p>
                </div>
              }
            </div>
          </div>
        }

        <!-- Idiomas -->
        @if (data.languages.length > 0) {
          <div>
            <h2 style="font-size:12px;font-weight:700;color:#3B5FC0;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;border-bottom:2px solid #3B5FC0;padding-bottom:4px">IDIOMAS</h2>
            <div style="display:flex;flex-direction:column;gap:4px">
              @for (lang of data.languages; track lang.id) {
                <p style="font-size:10px;margin:0"><strong>{{ lang.name }}</strong> – {{ lang.level }}</p>
              }
            </div>
          </div>
        }

      </div>
    </div>
  `,
})
export class Executivo02Component {
  @Input() data!: ResumeData;
}
