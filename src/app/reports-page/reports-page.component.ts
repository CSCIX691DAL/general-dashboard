import {Component, OnInit} from '@angular/core';
import {WidgetInfo} from '../services/Chart';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  public widget: WidgetInfo;


  isTable(obj: WidgetInfo): boolean{
    return obj.name === 'table';
  }

  ngOnInit(): void {
  }

}
