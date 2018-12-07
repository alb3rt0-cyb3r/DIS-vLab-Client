import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { UiRoutingModule } from './ui-routing.module';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';

import { HeaderComponent } from './components/header/header.component';
import { SubnavComponent } from './components/subnav/subnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    UiRoutingModule,
    HttpClientModule,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MainLayoutComponent,
    HomeLayoutComponent,
    SettingsLayoutComponent,
    HeaderComponent,
    SubnavComponent,
    SidenavComponent,
    FooterComponent
  ],
  exports: [ ClarityModule, ClrFormsNextModule, FormsModule, ReactiveFormsModule, HomeLayoutComponent, SettingsLayoutComponent ]
})
export class UiModule { }
