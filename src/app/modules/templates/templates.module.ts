import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';

import { DeployTemplateModalComponent } from './components/deploy-template-modal/deploy-template-modal.component';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';

import { TemplatesPageComponent } from './pages/templates-page/templates-page.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  declarations: [
    DeployTemplateModalComponent,
    TemplatesListComponent,
    TemplatesPageComponent
  ]
})
export class TemplatesModule { }
