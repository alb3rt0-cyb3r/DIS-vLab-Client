import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-domains-info',
  templateUrl: './host-domains-info.component.html',
  styleUrls: ['./host-domains-info.component.scss']
})
export class HostDomainsInfoComponent implements OnInit {

  @Input() domains: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onViewDomainsClick() {
    this.router.navigate(['/home/domains']);
  }

}
