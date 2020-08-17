import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrModal} from '@clr/angular';

import RFB from "../../../../../../node_modules/@novnc/novnc/core/rfb.js";

@Component({
  selector: 'app-remote-desktop-modal',
  templateUrl: './remote-desktop-modal.component.html',
  styleUrls: ['./remote-desktop-modal.component.scss']
})
export class RemoteDesktopModalComponent implements OnInit {

  @Output() finishEvent = new EventEmitter();
  @ViewChild(ClrModal) modal: ClrModal;
  opened: boolean;
  public rfb: RFB;
  port: string;

  constructor() { }

  open(port: string){
    this.modal.open();
    this.port = port;
  }

  connect(){
    console.log("Conectando...");
    const host = window.location.hostname;
    const password = "123";
    const path = "websockify";

    let url = "ws";

    if (window.location.protocol === "https:") {
      url = "wss";
    } else {
      url = "ws";
    }

    url += "://" + host;
    if (this.port){
      url += ":" + this.port;
    }
    url += "/" + path;

    console.log(url);

    this.rfb = new RFB(document.getElementById("screen"), url, {
      credentials: {password: password},
    });
  }

  ngOnInit() {
  }

  onClose() {
    if (this.rfb){
      this.rfb.disconnect();
    }
    this.modal.close();
  }
}
