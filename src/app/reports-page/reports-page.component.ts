import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WidgetInfo, WidgetTypes} from '../services/Chart';
import {Report} from '../../models/report';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeesService} from '../services/employees.service';
import {ChartFactoryService} from '../services/chart-factory.service';
import {ReportsService} from '../services/reports.service';
import {FormControl, FormGroup} from '@angular/forms';

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
