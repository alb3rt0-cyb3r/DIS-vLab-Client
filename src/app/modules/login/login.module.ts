import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';

import { LoginFormComponent } from './components/login-form/login-form.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  declarations: [
    LoginFormComponent,
    LoginPageComponent
  ]
})
export class LoginModule { }
