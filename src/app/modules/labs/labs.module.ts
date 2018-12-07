import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';

import { CreateLabModalComponent } from './components/create-lab-modal/create-lab-modal.component';
import { LabsListComponent } from './components/labs-list/labs-list.component';

import { LabsPageComponent } from './pages/labs-page/labs-page.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  declarations: [
    CreateLabModalComponent,
    LabsListComponent,
    LabsPageComponent
  ]
})
export class LabsModule { }
