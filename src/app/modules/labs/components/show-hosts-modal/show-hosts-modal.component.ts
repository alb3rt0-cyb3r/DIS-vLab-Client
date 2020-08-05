import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrModal} from '@clr/angular';

@Component({
  selector: 'app-show-hosts-modal',
  templateUrl: './show-hosts-modal.component.html',
  styleUrls: ['./show-hosts-modal.component.scss']
})
export class ShowHostsModalComponent implements OnInit {

  @Output() finishEvent = new EventEmitter();
  @ViewChild(ClrModal) modal: ClrModal;
  hosts: any[] = [];
  opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  open(hosts) {
    this.hosts = hosts;
    this.modal.open();
  }

  onClose() {
    this.modal.close();
  }
}
