import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ClrWizard} from '@clr/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {OSInstallationMethods} from '../../../../shared/enums/osinstallation-methods.enum';
import {OSVariants} from '../../../../shared/enums/osvariants.enum';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';

@Component({
    selector: 'app-create-domain-wizard',
    templateUrl: './create-domain-wizard.component.html',
    styleUrls: ['./create-domain-wizard.component.scss']
})
export class CreateDomainWizardComponent implements OnInit {

    @Output() finishEvent = new EventEmitter();
    @ViewChild(ClrWizard) wizard: ClrWizard;
    opened: boolean;
    form: FormGroup;
    alert: { error: string };
    osInstallationMethods: any;
    osVariants: any;

    constructor(private restful: RestfulService,
                private tasks: TasksService,
                private httpError: HttpErrorService,
                private fb: FormBuilder) {
        this.opened = false;
        this.form = this.buildForm();
        this.alert = {error: undefined};
        this.osInstallationMethods = OSInstallationMethods;
        this.osVariants = OSVariants;
    }

    ngOnInit() {
        this.wizard.reset();
    }

    open() {
        this.wizard.open();
    }

    // ---------------------------------------------------

    getOSInstallationMethodsKeys(): Array<string> {
        return Object.keys(this.osInstallationMethods);
    }

    getOSVariantsKeys(): Array<string> {
        return Object.keys(this.osVariants);
    }

    // ---------------------------------------------------

    onCancel() {
        if (confirm('¿Estás seguro de cancelar el asistente de instalación? Se perderán los cambios realizados.')) {
            this.wizard.close();
            this.resetWizard();
        }
    }

    onFinish() {
        this.alert.error = undefined;
        this.restful.createDomain(this.form.value)
            .subscribe(
                (res: any) => {
                    this.tasks.addLongTask(res, TaskTypes.DOMAIN_CREATION);
                    this.resetWizard();
                    this.finishEvent.emit(null);
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                });
    }

    // ----------------------------------------------------

    private resetWizard() {
        this.form = this.buildForm();
        this.wizard.reset();
    }

    private buildForm() {
        return this.fb.group({
            installation_type: ['', Validators.required],
            name: ['', Validators.required],
            memory: ['', Validators.required],
            vcpus: ['', Validators.required],
            disk: this.fb.group({
                path: [''],
                size: ['']
            }),
            cdrom: [''],
            import: [''],
            location: [''],
            network: [''],
            os_variant: ['', Validators.required],
            graphics: this.fb.group({
                vnc: [true],
                listen: ['0.0.0.0'],
                password: ['']
            })
        });

    }

}
