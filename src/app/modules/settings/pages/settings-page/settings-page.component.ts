import { Component, OnInit } from '@angular/core';
import {RestfulService} from '../../../../shared/services/restful.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(private restful: RestfulService) { }

  ngOnInit() {
    this.restful.
  }

}
