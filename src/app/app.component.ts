import {Component, OnInit} from '@angular/core';
import {SocketioService} from './shared/services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DIS-vLab-Client';
}
