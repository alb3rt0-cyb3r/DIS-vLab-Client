import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';

import { CreateDomainWizardComponent } from './components/create-domain-wizard/create-domain-wizard.component';
import { CloneDomainToTemplateModalComponent } from './components/clone-domain-to-template-modal/clone-domain-to-template-modal.component';
import { DomainsListComponent } from './components/domains-list/domains-list.component';

import { DomainsPageComponent } from './pages/domains-page/domains-page.component';
import { RemoteDesktopModalComponent } from './components/remote-desktop-modal/remote-desktop-modal.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  declarations: [
    CreateDomainWizardComponent,
    CloneDomainToTemplateModalComponent,
    DomainsListComponent,
    DomainsPageComponent,
    RemoteDesktopModalComponent
  ]
})
export class DomainsModule { }
