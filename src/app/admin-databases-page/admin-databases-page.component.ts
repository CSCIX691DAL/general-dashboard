import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {DatabaseService} from '../services/database-connection.service';
import {Database} from '../../models/database';
import {SequelizeService} from '../services/sequelize.service';

@Component({
  selector: 'app-admin-databases-page',
  templateUrl: './admin-databases-page.component.html',
  styleUrls: ['./admin-databases-page.component.css']
})
export class AdminDatabasesPageComponent implements OnInit {

  databases: Database[];
  constructor(public auth: AuthService,
              public conn: DatabaseService,
              private router: Router,
              private seqService: SequelizeService) {

    if (auth.isAdmin() === false){
      this.router.navigate(['/home']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.databases = await this.conn.getDatabaseConnections();
  }

  updateDatabases(): void{
    this.databases.forEach(db => {
      this.seqService.generateModels(db.id).then(resp => {
        alert('Databases updated');
      }).catch(err => {
        alert(err);
      });
    });

  }
}
