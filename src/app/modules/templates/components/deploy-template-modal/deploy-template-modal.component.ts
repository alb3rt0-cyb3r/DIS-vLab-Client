import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ClrModal } from '@clr/angular';
import { RestfulService } from '../../../../shared/services/restful.service';
import { TasksService } from '../../../../shared/services/tasks.service';
import { TaskTypes } from '../../../../shared/enums/task-types.enum';
import {HttpErrorService} from '../../../../shared/services/http-error.service';

@Component({
  selector: 'app-deploy-template-modal',
  templateUrl: './deploy-template-modal.component.html',
  styleUrls: ['./deploy-template-modal.component.scss']
})
export class DeployTemplateModalComponent {

  labs: any[];
  alert: { error: string };
  loading: boolean;

  @ViewChild(ClrModal) modal: ClrModal;
  opened: boolean;
  form: FormGroup;
  template_uuid: any;

  constructor(private restful: RestfulService,
              private tasks: TasksService,
              private httpError: HttpErrorService,
              private fb: FormBuilder) {
    this.alert = { error: undefined };
    this.loading = false;
    this.opened = false;
    this.form = this.buildForm();
  }

  onCancel() {
    this.modal.close();
  }

  onDeploy() {
    this.alert.error = undefined;
    this.loading = true;
    const task = this.tasks.addTask(TaskTypes.TEMPLATE_DEPLOYMENT);
    this.restful.deployTemplate(this.template_uuid, this.form.value)
      .subscribe(
        (res: any) => {
          this.tasks.finishTask(task);
          this.loading = false;
          this.modal.close();
        },
        (error: HttpErrorResponse) => {
          this.alert.error = this.httpError.getMessageError(error);
          this.loading = false;
          this.tasks.finishTask(task, true);
          console.log(error);
        });
  }

  open(template_uuid) {
    this.getLabs();
    this.template_uuid = template_uuid;
    this.modal.open();
  }

  private getLabs() {
    this.restful.getLabs().subscribe(
      (labs: any) => this.labs = labs,
      (error: HttpErrorResponse) => {
        this.alert.error = this.httpError.getMessageError(error);
        console.error(error);
      });
  }

  private buildForm() {
    return this.fb.group({
      domain_name: ['', Validators.required],
      lab_deployment: [true],
      lab_uuid: ['', Validators.required]
    });
  }

}
