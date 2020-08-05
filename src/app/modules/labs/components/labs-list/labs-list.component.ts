import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {CreateLabModalComponent} from '../create-lab-modal/create-lab-modal.component';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';
import {ShowHostsModalComponent} from '../show-hosts-modal/show-hosts-modal.component';

interface Lab {
    uuid: string;
    code: string;
    start_ip_range: string;
    end_ip_range: string;
    netmask: string;
    hosts: { total: number, vcpus: number, memory: number, disk: number };
}

@Component({
    selector: 'app-labs-list',
    templateUrl: './labs-list.component.html',
    styleUrls: ['./labs-list.component.scss']
})
export class LabsListComponent implements OnInit {

    @ViewChild(CreateLabModalComponent) createLabModal: CreateLabModalComponent;
    @ViewChild(ShowHostsModalComponent) showHostsModal: ShowHostsModalComponent;

    labs: Lab[];
    selected: Lab;
    loading: boolean;
    alert: { success: string, error: string };

    constructor(private restful: RestfulService,
                private tasks: TasksService,
                private httpError: HttpErrorService) {
        this.labs = [];
        this.selected = null;
        this.loading = true;
        this.alert = {success: undefined, error: undefined};
    }

    ngOnInit() {
        this.getLabs();
    }

    onRefresh() {
        this.alert = {success: undefined, error: undefined};
        this.getLabs();
    }

    onViewHosts() {
        // TODO - Implement something to list lab hosts
        const task = this.tasks.addTask(TaskTypes.HOST_GET_ALL, this.selected.code);
        this.restful.getHosts(this.selected.uuid)
            .subscribe(
                (hosts: any) => {
                    this.tasks.finishTask(task);
                    this.showHostsModal.open(hosts);
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    //   --------------------
    // ---- LAB CRUD START ----
    //   --------------------

    onCreateLab() {
        this.createLabModal.open();
    }


    onUpdateLab() {
        // TODO - Show update lab modal
    }

    onDeleteLab() {
        const task = this.tasks.addTask(TaskTypes.LAB_DELETION, this.selected.code);
        this.restful.deleteLab(this.selected.uuid)
            .subscribe(
                (res: any) => {
                    this.alert.success = res;
                    this.getLabs();
                    this.tasks.finishTask(task);
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    //   ------------------
    // ---- LAB CRUD END ----
    //   ------------------

    private getLabs() {
        const task = this.tasks.addTask(TaskTypes.LAB_GET_ALL);
        this.loading = true;
        this.restful.getLabs()
            .subscribe(
                (labs: any) => {
                    this.labs = labs;
                    this.tasks.finishTask(task);
                    this.loading = !this.loading;
                },
                (error) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                    this.loading = !this.loading;
                });
    }

}
