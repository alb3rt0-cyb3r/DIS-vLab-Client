import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-memory-info',
  templateUrl: './host-memory-info.component.html',
  styleUrls: ['./host-memory-info.component.scss']
})
export class HostMemoryInfoComponent implements OnInit {

  @Input() memory: any

  constructor() { }

  ngOnInit() {
  }

}
