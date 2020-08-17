import { Component, OnInit } from '@angular/core';
import {RestfulService} from '../../../../shared/services/restful.service';
import {TasksService} from '../../../../shared/services/tasks.service';
import {TaskTypes} from '../../../../shared/enums/task-types.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface Parameters {
    LOCAL_QEMU_URI: string;
    CONN_USER: string;
    DOMAIN_DEFINITIONS_DIR: string;
    DOMAIN_IMAGES_DIR: string;
    TEMPLATE_DEFINITIONS_DIR: string;
    TEMPLATE_IMAGES_DIR: string;
}

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit {

  parameters: Parameters;
  form: FormGroup;

  constructor(private restful: RestfulService,
              private tasks: TasksService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.onRefresh();
  }

  getConfig(){
    const task = this.tasks.addTask(TaskTypes.SETTINGS_GET_ALL);
    this.restful.getConfig()
        .subscribe(
            (settings: any) => {
              this.parameters = settings;
              this.form.controls['TEMPLATE_DEFINITIONS_DIR'].setValue(settings.TEMPLATE_DEFINITIONS_DIR);
              this.form.controls['TEMPLATE_IMAGES_DIR'].setValue(settings.TEMPLATE_IMAGES_DIR);
              this.form.controls['DOMAIN_DEFINITIONS_DIR'].setValue(settings.DOMAIN_DEFINITIONS_DIR);
              this.form.controls['DOMAIN_IMAGES_DIR'].setValue(settings.DOMAIN_IMAGES_DIR);
              this.form.controls['LOCAL_QEMU_URI'].setValue(settings.LOCAL_QEMU_URI);
              this.form.controls['CONN_USER'].setValue(settings.CONN_USER);
              this.tasks.finishTask(task);
            },
            (error : HttpErrorResponse) => {
              console.log("ERROR!");
              this.tasks.finishTask(task, true);
            }
        );
  }

  buildForm(){
      return this.fb.group({
          DOMAIN_DEFINITIONS_DIR: ['', Validators.required],
          DOMAIN_IMAGES_DIR: ['', Validators.required],
          TEMPLATE_DEFINITIONS_DIR: ['', Validators.required],
          TEMPLATE_IMAGES_DIR: ['', Validators.required],
          LOCAL_QEMU_URI: ['', Validators.required],
          CONN_USER: ['', Validators.required]
      });
  }

    onRefresh() {
        this.form = this.buildForm();
        this.getConfig();
    }
}
