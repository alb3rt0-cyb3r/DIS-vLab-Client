import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClrModal} from '@clr/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';

@Component({
    selector: 'app-create-lab-modal',
    templateUrl: './create-lab-modal.component.html',
    styleUrls: ['./create-lab-modal.component.scss']
})
export class CreateLabModalComponent {

    @Output() finishEvent = new EventEmitter();
    @ViewChild(ClrModal) modal: ClrModal;
    opened: boolean;
    form: FormGroup;
    alert: { error: string };

    constructor(private restful: RestfulService,
                private tasks: TasksService,
                private httpError: HttpErrorService,
                private fb: FormBuilder) {
        this.opened = false;
        this.form = this.buildForm();
        this.alert = {error: undefined};
    }

    open() {
        this.modal.open();
    }

    onCancel() {
        this.modal.close();
    }

    onCreate() {
        this.alert.error = undefined;
        const task = this.tasks.addTask(TaskTypes.LAB_CREATION);
        this.restful.createLab(this.form.value)
            .subscribe(
                (res: any) => {
                    console.log(res);
                    this.tasks.finishTask(task);
                    this.modal.close();
                    this.finishEvent.emit(null);
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.tasks.finishTask(task, true);
                });
    }

    private buildForm() {
        return this.fb.group({
            code: ['', Validators.required],
            description: ['', Validators.required],
            start_ip_range: ['', Validators.required],
            end_ip_range: ['', Validators.required],
            hosts: this.fb.group({
                vcpus: ['', Validators.required],
                memory: ['', Validators.required],
                disk: ['', Validators.required]
            })
        });
    }

}
