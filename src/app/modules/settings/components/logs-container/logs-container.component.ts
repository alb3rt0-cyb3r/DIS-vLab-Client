import {Component, OnInit} from '@angular/core';
import {RestfulService} from '../../../../shared/services/restful.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-logs-container',
    templateUrl: './logs-container.component.html',
    styleUrls: ['./logs-container.component.scss']
})
export class LogsContainerComponent implements OnInit {

    logs: any;

    constructor(private restful: RestfulService) {
    }

    ngOnInit() {
        this.getLogs();
    }

    public onRefresh() {
        this.getLogs();
    }

    public onClear() {
        this.clearLogs();
    }

    private getLogs() {
        this.restful.getLogs()
            .subscribe(
                (res: any) => {
                    this.logs = res;
                    console.log(this.logs);
                },
                (error: HttpErrorResponse) => {
                    console.error(error);
                });
    }

    private clearLogs() {
        this.restful.clearLogs().subscribe(
            (res) => {
                this.logs = null;
                console.log(res);
            },
            (error: HttpErrorResponse) => {
                console.error(error);
            });
    }

}
