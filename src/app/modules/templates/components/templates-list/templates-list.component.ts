import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DeployTemplateModalComponent} from '../deploy-template-modal/deploy-template-modal.component';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';
import {SocketioService} from '../../../../shared/services/socketio.service';

interface Template {
    uuid: string;
    timestamp: Date;
    name: string;
    description: string;
    vcpus: number;
    memory: number;
    xml_path: string;
    images_path: string[];
}

@Component({
    selector: 'app-templates-list',
    templateUrl: './templates-list.component.html',
    styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

    @ViewChild(DeployTemplateModalComponent) deployTemplateModal: DeployTemplateModalComponent;

    templates: Template[];
    loading: boolean;
    alert: { success: string, error: string };

    constructor(private restful: RestfulService,
                private tasks: TasksService,
                private httpError: HttpErrorService,
                private socketioService: SocketioService) {
        this.templates = undefined;
        this.loading = false;
        this.alert = {success: undefined, error: undefined};
    }

    ngOnInit() {
        this.getTemplates();
        this.socketioService.listen('task-finished')
            .subscribe((data: any) => {
                if(data.task_type == 'clone-template'){
                    if(data.status == 0){
                        this.alert.success = "Plantilla desplegada correctamente";
                    } else {
                        this.alert.error = "Error desplegando plantilla";
                    }
                } else if (data.task_type == 'create-template'){
                    if(data.status == 0){
                        this.alert.success = "Plantilla creada correctamente";
                        this.getTemplates();
                    } else {
                        this.alert.error = "Error creando plantilla";
                    }
                }
            })
    }

    onRefresh() {
        // this.alert = {success: undefined, error: undefined};
        this.getTemplates();
    }

    onDeployTemplate(uuid) {
        this.deployTemplateModal.open(uuid);
    }

    onDeleteTemplate(uuid) {
        const task = this.tasks.addTask(TaskTypes.TEMPLATE_DELETION);
        this.restful.deleteTemplate(uuid)
            .subscribe(
                (res: any) => {
                    this.alert.success = res;
                    this.tasks.finishTask(task);
                    this.onRefresh();
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                },
                () => {
                });
    }

    private getTemplates() {
        const task = this.tasks.addTask(TaskTypes.TEMPLATE_GET_ALL);
        this.loading = true;
        this.restful.getTemplates().subscribe(
            (templates: any) => {
                this.templates = templates;
                this.tasks.finishTask(task);
            },
            (error: HttpErrorResponse) => {
                this.alert.error = this.httpError.getMessageError(error);
                this.tasks.finishTask(task, true);
            },
            () => this.loading = !this.loading);
    }

}
