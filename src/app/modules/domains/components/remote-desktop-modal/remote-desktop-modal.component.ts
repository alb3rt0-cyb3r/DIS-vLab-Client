import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrModal} from '@clr/angular';

@Component({
  selector: 'app-remote-desktop-modal',
  templateUrl: './remote-desktop-modal.component.html',
  styleUrls: ['./remote-desktop-modal.component.scss']
})
export class RemoteDesktopModalComponent implements OnInit {

  @Output() finishEvent = new EventEmitter();
  @ViewChild(ClrModal) modal: ClrModal;
  opened: boolean;

  constructor() { }

  open(){
    this.modal.open();
  }

  ngOnInit() {
  }

  onClose() {
    this.modal.close();
  }
}
