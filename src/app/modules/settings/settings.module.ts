import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { LogsPageComponent } from './pages/logs-page/logs-page.component';
import { LogsContainerComponent } from './components/logs-container/logs-container.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  declarations: [
    SettingsPageComponent,
    LogsPageComponent,
    LogsContainerComponent
  ]
})
export class SettingsModule { }
