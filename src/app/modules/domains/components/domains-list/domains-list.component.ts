import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {CreateDomainWizardComponent} from '../create-domain-wizard/create-domain-wizard.component';
import {CloneDomainToTemplateModalComponent} from '../clone-domain-to-template-modal/clone-domain-to-template-modal.component';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';
import {RemoteDesktopModalComponent} from '../remote-desktop-modal/remote-desktop-modal.component';
import {EditDomainModalComponent} from '../edit-domain-modal/edit-domain-modal.component';
import {SocketioService} from '../../../../shared/services/socketio.service';

interface Domain {
    uuid: string;
    name: string;
    is_active: boolean;
    os_type: string;
    memory: { total: number, used: number };
    vcpus: number;
    disk: {allocation: number, capacity: number, physical: number};
    state: number;
    vnc_port: number;
}

@Component({
    selector: 'app-domains-list',
    templateUrl: './domains-list.component.html',
    styleUrls: ['./domains-list.component.scss']
})

export class DomainsListComponent implements OnInit {

    @ViewChild(CreateDomainWizardComponent) createDomainWizard: CreateDomainWizardComponent;
    @ViewChild(CloneDomainToTemplateModalComponent) cloneToTemplateWizard: CloneDomainToTemplateModalComponent;
    @ViewChild(RemoteDesktopModalComponent) remoteDesktopModal: RemoteDesktopModalComponent;
    @ViewChild(EditDomainModalComponent) editDomainModal: EditDomainModalComponent;

    domains: Domain[];
    selected: Domain;
    loading: boolean;
    alert: { success: any, error: any };

    constructor(private restful: RestfulService,
                private tasks: TasksService,
                private httpError: HttpErrorService,
                private socketService: SocketioService) {
        this.domains = [];
        this.selected = null;
        this.loading = false;
        this.alert = {success: undefined, error: undefined};
    }

    ngOnInit() {
        this.getDomains();
        this.socketService.listen('task-finished')
            .subscribe((data: any) => {
                if(data.task_type == 'add-domain'){
                    if (data.status == 0){
                        this.getDomains();
                        this.alert.success = "Dominio creado correctamente";
                    }else{
                        this.alert.error = "Error al crear el dominio, comprobar logs";
                    }
                } else if (data.task_type == 'create-template') {
                    if (data.status == 0){
                        this.alert.success = "Plantilla creada correctamente";
                    }else{
                        this.alert.error = "Error al crear la plantilla, comprobar logs";
                    }
                }
            });
    }

    onCloneToTemplate() {
        this.cloneToTemplateWizard.open();
    }

    onNewDomain() {
        this.createDomainWizard.open();
    }

    onDeleteDomain() {
        const task = this.tasks.addTask(TaskTypes.DOMAIN_DELETION, this.selected.name);
        this.restful.deleteDomain(this.selected.uuid)
            .subscribe(
                (res: any) => {
                    this.alert.success = res;
                    this.tasks.finishTask(task);
                    this.getDomains();
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    onRefresh() {
        this.alert = {success: undefined, error: undefined};
        this.getDomains();
    }

    /**
     * DOMAIN POWER MANAGEMENT START
     */

    onStartDomain() {
        const task = this.tasks.addTask(TaskTypes.DOMAIN_POWER_START, this.selected.name);
        this.restful.startDomain(this.selected.uuid)
            .subscribe(
                (res) => {
                    this.alert.success = res;
                    this.tasks.finishTask(task);
                    this.getDomains();
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    onRebootDomain() {
        const task = this.tasks.addTask(TaskTypes.DOMAIN_POWER_REBOOT, this.selected.name);
        this.restful.rebootDomain(this.selected.uuid)
            .subscribe(
                (res) => {
                    this.alert.success = res;
                    this.tasks.finishTask(task);
                    this.getDomains();
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    onShutdownDomain() {
        const task = this.tasks.addTask(TaskTypes.DOMAIN_POWER_SHUTDOWN, this.selected.name);
        this.restful.shutdownDomain(this.selected.uuid)
            .subscribe(
                (res) => {
                    this.alert.success = res;
                    this.tasks.finishTask(task);
                    this.getDomains();
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    /**
     * DOMAIN POWER MANAGEMENT END
     */

    private getDomains() {
        const task = this.tasks.addTask(TaskTypes.DOMAIN_GET_ALL);
        this.loading = true;
        this.restful.getDomains()
            .subscribe(
                (domains: any) => {
                    this.domains = domains;
                    this.tasks.finishTask(task);
                    this.loading = !this.loading;
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                    this.loading = !this.loading;
                });
    }

    onRemoteDesktop() {
        this.remoteDesktopModal.open("6081");
    }

    onEditDomain() {
        this.editDomainModal.open(this.selected.memory.total, this.selected.vcpus, this.selected.uuid);
    }
}
