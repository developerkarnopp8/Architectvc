import { Component, Input, OnChanges, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ResumeData } from '../../../../core/models';
import { Criativo01Component } from '../criativo-01/criativo-01.component';
import { Criativo02Component } from '../criativo-02/criativo-02.component';
import { Executivo01Component } from '../executivo-01/executivo-01.component';
import { Executivo02Component } from '../executivo-02/executivo-02.component';
import { Minimalista01Component } from '../minimalista-01/minimalista-01.component';
import { Minimalista02Component } from '../minimalista-02/minimalista-02.component';
import { Moderno01Component } from '../moderno-01/moderno-01.component';
import { Moderno02Component } from '../moderno-02/moderno-02.component';

const TEMPLATE_COMPONENT_MAP: Record<string, Type<{ data: ResumeData }>> = {
  'criativo-01':    Criativo01Component,
  'criativo-02':    Criativo02Component,
  'executivo-01':   Executivo01Component,
  'executivo-02':   Executivo02Component,
  'minimalista-01': Minimalista01Component,
  'minimalista-02': Minimalista02Component,
  'moderno-01':     Moderno01Component,
  'moderno-02':     Moderno02Component,
};

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    @if (activeComponent) {
      <div
        style="width:595px;height:842px;transform-origin:top left;overflow:hidden"
        [style.transform]="'scale(' + scale + ')'"
      >
        <ng-container
          [ngComponentOutlet]="activeComponent"
          [ngComponentOutletInputs]="{ data: data }"
        />
      </div>
    }
  `,
})
export class CvPreviewComponent implements OnChanges {
  @Input() data!: ResumeData;
  @Input() templateId: string = 'criativo-01';
  @Input() scale: number = 1;

  activeComponent?: Type<{ data: ResumeData }>;

  ngOnChanges(): void {
    this.activeComponent = TEMPLATE_COMPONENT_MAP[this.templateId] ?? Criativo01Component;
  }
}
