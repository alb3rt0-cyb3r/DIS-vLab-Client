import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-labs-info',
  templateUrl: './host-labs-info.component.html',
  styleUrls: ['./host-labs-info.component.scss']
})
export class HostLabsInfoComponent implements OnInit {

  @Input() labs: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onViewLabsClick() {
    this.router.navigate(['/home/labs']);
  }

}
