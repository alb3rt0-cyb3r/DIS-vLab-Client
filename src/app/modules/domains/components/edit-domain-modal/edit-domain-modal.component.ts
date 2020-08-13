import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrModal} from '@clr/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {HttpErrorService} from '../../../../shared/services/http-error.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-domain-modal',
  templateUrl: './edit-domain-modal.component.html',
  styleUrls: ['./edit-domain-modal.component.scss']
})
export class EditDomainModalComponent implements OnInit {

  @Output() finishEvent = new EventEmitter();
  @ViewChild(ClrModal) modal:ClrModal;

  opened: boolean;
  form: FormGroup;
  memory: number;
  vcpus: number;
  uuid: string;

  constructor(private restful: RestfulService,
              private tasks: TasksService,
              private httpError: HttpErrorService,
              private fb: FormBuilder) {
      this.opened = false;
  }

  ngOnInit() {
  }

  open(memory, vcpus, uuid) {
    this.form = this.buildForm();
    this.memory = memory;
    this.vcpus = vcpus;
    this.uuid = uuid;
    this.form.controls['vcpus'].setValue(this.vcpus.toString());
    this.form.controls['memory'].setValue(this.memory.toString());
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }

  onEdit() {
    const task = this.tasks.addTask(TaskTypes.DOMAIN_RECONFIGURATION);
    this.restful.updateDomain(this.uuid, this.form.value)
        .subscribe(
            (res: any) => {
              this.tasks.finishTask(task);
              this.finishEvent.emit(null);
              this.opened = false;
            },
            (error: HttpErrorResponse) => {
              this.tasks.finishTask(task, true);
              console.log(error);
            }
        )
  }

  private buildForm(){
    return this.fb.group({
      vcpus: ['', Validators.required],
      memory: ['', Validators.required]
    });
  }

}
