import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, Subscription, interval} from 'rxjs';
import { TaskTypes } from '../enums/task-types.enum';
import {RestfulService} from './restful.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SocketioService} from './socketio.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  private _tasks: Task[];
  private _longTasks: LongTask[];
  private _tasksSubject: BehaviorSubject<Task[]>;

  constructor(private restfulService: RestfulService, private router: Router, private socketioService: SocketioService) {
    this._tasks = [];
    this._longTasks = [];
    this._tasksSubject = new BehaviorSubject<Task[]>(this._tasks);
  }

  getTasks(): Observable<Task[]> {
    return this._tasksSubject.asObservable();
  }

  addTask(taskType: TaskTypes, object: string = 'dvls'): Task {
    const task = new Task(taskType, object);
    this._tasks.push(task);
    this._tasks.sort((a: any, b: any) => a.init_date - b.init_date).reverse();
    this._tasksSubject.next(this._tasks);
    return task;
  }

  finishTask(task: Task, withErrors = false) {
    const pos = this._tasks.indexOf(task);
    this._tasks[pos].finish_date = new Date();
    this._tasks[pos].result = (withErrors) ? 'Terminado con errores' : 'Completado';
  }

  addLongTask(task_id: string, taskType: TaskTypes, object: string = 'dvls') {
    let longTask = new LongTask(task_id);
    longTask.task = this.addTask(taskType, object);
    longTask.subscription = this.socketioService.listen("task-finished")
        .subscribe((data: any) => {
          if(data.status != 0){
            this.finishLongTask(longTask, true);
          } else {
            this.finishLongTask(longTask);
          }
        })
    this._longTasks.push(longTask);
    return longTask;
  }

  finishLongTask(longTask: LongTask, withErrors = false){
    const longTaskPos = this._longTasks.indexOf(longTask);
    this._longTasks[longTaskPos].subscription.unsubscribe();
    let shortTask = this._longTasks[longTaskPos].task;
    this.finishTask(shortTask, withErrors);
  }

}

export class Task {

  type: TaskTypes;
  object: any;
  init_date: Date;
  finish_date: Date;
  result: any;

  constructor(type: TaskTypes, object: string) {
    this.type = type;
    this.object = object;
    this.init_date = new Date();
    this.finish_date = null;
    this.result = 'En ejecución...';
  }

}

export class LongTask {
  task: Task;
  task_id: string;
  subscription: Subscription;

  constructor(task_id: string){
    this.task_id = task_id;
  }
}
