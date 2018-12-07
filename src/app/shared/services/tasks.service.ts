import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TaskTypes } from '../enums/task-types.enum';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  private _tasks: Task[];
  private _tasksSubject: BehaviorSubject<Task[]>;

  constructor() {
    this._tasks = [];
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

}

class Task {

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
