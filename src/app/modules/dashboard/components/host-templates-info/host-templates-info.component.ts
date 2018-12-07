import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-templates-info',
  templateUrl: './host-templates-info.component.html',
  styleUrls: ['./host-templates-info.component.scss']
})
export class HostTemplatesInfoComponent implements OnInit {

  @Input() templates: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onViewTemplatesClick() {
    this.router.navigate(['/home/templates']);
  }

}
