import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AppLayout',
  templateUrl: './AppLayout.component.html',
  styleUrls: ['./AppLayout.component.css']
})
export class AppLayoutComponent implements OnInit {
  links = ['Plans', 'FAQs', 'Top Up','Policies','Wifi'];

  constructor() { }

  ngOnInit() {
  }

}
