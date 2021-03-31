import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserhomeComponent} from '../userhome/userhome.component';
import {WidgetInfo} from '../services/Chart';

@Component({
  selector: 'app-widget-sidebar',
  templateUrl: './widget-sidebar.component.html',
  styleUrls: ['./widget-sidebar.component.css']
})
export class WidgetSidebarComponent implements OnInit {

  public widgets: WidgetInfo[] = [];
  constructor(public userpage: UserhomeComponent) { }
  ngOnInit(): void {
    this.widgets = this.userpage.widgets;
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
