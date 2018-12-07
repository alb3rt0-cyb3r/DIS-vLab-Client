import {Component, OnInit} from '@angular/core';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpErrorService} from '../../../../shared/services/http-error.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

    alert: { error: any };
    hostInfo: { system: any, domains: any, cpu: any, memory: any, templates: any, labs: any };
    loading: boolean;

    constructor(private restful: RestfulService, private tasks: TasksService, private httpError: HttpErrorService) {
        this.alert = {error: undefined};
        this.loading = true;
        this.hostInfo = {system: '', domains: '', cpu: '', memory: '', templates: '', labs: ''};
    }

    ngOnInit() {
        this.getHostInfo();
    }

    private getHostInfo() {
        this.alert.error = undefined;
        const task = this.tasks.addTask(TaskTypes.HOST_INFO);
        this.loading = true;
        this.restful.getDashboard()
            .subscribe(
                (res: any) => {
                    this.hostInfo = res;
                    this.tasks.finishTask(task);
                    this.loading = !this.loading;
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                    this.loading = !this.loading;
                });
    }

}
