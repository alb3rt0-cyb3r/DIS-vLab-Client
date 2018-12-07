import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {SettingsLayoutComponent} from './layouts/settings-layout/settings-layout.component';

import {LoginPageComponent} from '../login/pages/login-page/login-page.component';
import {DashboardPageComponent} from '../dashboard/pages/dashboard-page/dashboard-page.component';
import {DomainsPageComponent} from '../domains/pages/domains-page/domains-page.component';
import {LabsPageComponent} from '../labs/pages/labs-page/labs-page.component';
import {TemplatesPageComponent} from '../templates/pages/templates-page/templates-page.component';
import {SettingsPageComponent} from '../settings/pages/settings-page/settings-page.component';
import {LogsPageComponent} from '../settings/pages/logs-page/logs-page.component';

import {AuthGuard} from '../../shared/guards/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home', component: HomeLayoutComponent, canActivateChild: [AuthGuard], children: [
            {path: 'dashboard', component: DashboardPageComponent},
            {path: 'domains', component: DomainsPageComponent},
            {path: 'labs', component: LabsPageComponent},
            {path: 'templates', component: TemplatesPageComponent},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    },
    {
        path: 'settings', component: SettingsLayoutComponent, canActivateChild: [AuthGuard], children: [
            {path: 'settings', component: SettingsPageComponent},
            {path: 'logs', component: LogsPageComponent},
            {path: '', redirectTo: 'settings', pathMatch: 'full'}
        ]
    },
    {path: 'login', component: LoginPageComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UiRoutingModule {
}
