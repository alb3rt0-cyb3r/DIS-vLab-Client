import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../../shared/services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  queue: any[];

  constructor(private tasks: TasksService) {
    this.queue = [];
  }

  ngOnInit() {
    this.getTasks();
  }

  private getTasks() {
    this.tasks.getTasks().subscribe(
      (res: any) => this.queue = res,
      (error) => console.error(error));
  }

}
