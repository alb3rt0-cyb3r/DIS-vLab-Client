import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';

import { HostGeneralInfoComponent } from './components/host-general-info/host-general-info.component';
import { HostMemoryInfoComponent } from './components/host-memory-info/host-memory-info.component';
import { HostDomainsInfoComponent } from './components/host-domains-info/host-domains-info.component';
import { HostLabsInfoComponent } from './components/host-labs-info/host-labs-info.component';
import { HostTemplatesInfoComponent } from './components/host-templates-info/host-templates-info.component';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  declarations: [
    HostGeneralInfoComponent,
    HostMemoryInfoComponent,
    HostDomainsInfoComponent,
    HostLabsInfoComponent,
    HostTemplatesInfoComponent,
    DashboardPageComponent
  ]
})
export class DashboardModule { }
