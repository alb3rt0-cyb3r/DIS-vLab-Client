import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule} from './modules/login/login.module';
import { DashboardModule} from './modules/dashboard/dashboard.module';
import { DomainsModule } from './modules/domains/domains.module';
import { LabsModule } from './modules/labs/labs.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { SettingsModule} from './modules/settings/settings.module';

import { AuthService} from './shared/services/auth.service';
import { RestfulService} from './shared/services/restful.service';
import { TasksService} from './shared/services/tasks.service';
import { SocketioService} from './shared/services/socketio.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    DomainsModule,
    LabsModule,
    TemplatesModule,
    SettingsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthService,
    RestfulService,
    TasksService,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
