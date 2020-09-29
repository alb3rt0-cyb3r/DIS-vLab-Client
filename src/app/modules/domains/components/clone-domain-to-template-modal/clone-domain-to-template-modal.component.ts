import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ClrModal} from '@clr/angular';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';

@Component({
    selector: 'app-clone-domain-to-template-modal',
    templateUrl: './clone-domain-to-template-modal.component.html',
    styleUrls: ['./clone-domain-to-template-modal.component.scss']
})
export class CloneDomainToTemplateModalComponent implements OnInit {

    @Input() domain_uuid: any;
    @ViewChild(ClrModal) modal: ClrModal;

    opened: boolean;
    cloning: boolean;
    alert: { error: string };
    form: FormGroup;

    constructor(private restful: RestfulService,
                private tasks: TasksService,
                private httpError: HttpErrorService,
                private fb: FormBuilder) {
        this.opened = false;
        this.cloning = false;
        this.alert = {error: undefined};
    }

    ngOnInit() {

    }

    open() {
        this.form = this.buildForm();
        this.modal.open();
    }

    onCancel() {
        this.modal.close();
    }

    onClone() {
        this.alert.error = undefined;
        this.restful.createTemplate(this.form.value)
            .subscribe(
                (res: any) => {
                    this.tasks.addLongTask(res, TaskTypes.TEMPLATE_CREATION);
                    this.opened = false;
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                });
    }

    private buildForm() {
        return this.fb.group({
            domain_uuid: [this.domain_uuid, Validators.required],
            do_sysprep: [false, Validators.required],
            template_name: ['', Validators.required],
            template_description: ['', Validators.required]
        });
    }

}
