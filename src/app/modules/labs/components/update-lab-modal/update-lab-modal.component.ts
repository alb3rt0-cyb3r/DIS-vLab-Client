import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrModal} from '@clr/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {HttpErrorService} from '../../../../shared/services/http-error.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorResponse} from '@angular/common/http';

interface Lab {
  uuid: string;
  code: string;
  description: string;
  start_ip_range: string;
  end_ip_range: string;
  netmask: string;
  hosts: { total: number, vcpus: number, memory: number, disk: number };
}

@Component({
  selector: 'app-update-lab-modal',
  templateUrl: './update-lab-modal.component.html',
  styleUrls: ['./update-lab-modal.component.scss']
})
export class UpdateLabModalComponent implements OnInit {

  @Output() finishEvent = new EventEmitter()
  @ViewChild(ClrModal) modal: ClrModal;

  opened: boolean;
  form: FormGroup;
  lab: Lab;
  alert: { error: string };

  constructor(private restful: RestfulService,
              private tasks: TasksService,
              private httpError: HttpErrorService,
              private fb: FormBuilder) {
    this.opened = false;
    this.form = this.buildForm();
    this.alert = { error: undefined };
  }

  ngOnInit() {
  }

  open(lab){
    this.lab = lab;
    this.form.controls['code'].setValue(this.lab.code);
    this.form.controls['description'].setValue(this.lab.description);
    this.form.controls['start_ip_range'].setValue(this.lab.start_ip_range);
    this.form.controls['end_ip_range'].setValue(this.lab.end_ip_range);
    this.form.get('hosts.vcpus').setValue(this.lab.hosts.vcpus);
    this.form.get('hosts.memory').setValue(this.lab.hosts.memory);
    this.form.get('hosts.disk').setValue(this.lab.hosts.disk);
    this.modal.open();
  }

  onCancel(){
    this.modal.close();
  }

  onUpdate(){
    const task = this.tasks.addTask(TaskTypes.LAB_EDITION);
    this.restful.updateLab(this.lab.uuid, this.form.value)
        .subscribe(
            (res: any) => {
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
