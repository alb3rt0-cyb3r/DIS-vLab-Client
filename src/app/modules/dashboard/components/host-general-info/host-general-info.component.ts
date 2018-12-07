import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-general-info',
  templateUrl: './host-general-info.component.html',
  styleUrls: ['./host-general-info.component.scss']
})
export class HostGeneralInfoComponent implements OnInit {

  @Input() system: any;
  @Input() cpu: any;

  constructor() { }

  ngOnInit() {
  }

}
