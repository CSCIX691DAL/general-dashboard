import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {DatabaseService} from '../services/database-connection.service';
import {Database} from '../../models/database';

@Component({
  selector: 'app-admin-databases-page',
  templateUrl: './admin-databases-page.component.html',
  styleUrls: ['./admin-databases-page.component.css']
})
export class AdminDatabasesPageComponent implements OnInit {

  dataBases: Database[];
  constructor(public auth: AuthService, private router: Router, public conn: DatabaseService) {
    if (auth.isAdmin() === false){
      this.router.navigate(['/home']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.dataBases = await this.conn.getDatabaseConnections();
  }
}
