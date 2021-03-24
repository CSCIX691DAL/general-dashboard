import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-widget-sidebar',
  templateUrl: './widget-sidebar.component.html',
  styleUrls: ['./widget-sidebar.component.css']
})
export class WidgetSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // function taken from:  https://therichpost.com/how-to-make-simple-sidebar-template-with-bootstrap-4-and-angular-9/
    // tslint:disable-next-line:only-arrow-functions
    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
    $('#menu-toggle').click(function(event) {
      event.preventDefault();
      $('#barRight').toggle();
      $('#barLeft').toggle();
    });
  }

}
