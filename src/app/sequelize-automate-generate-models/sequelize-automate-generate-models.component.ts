import { Component, OnInit } from '@angular/core';
import {SequelizeService} from '../services/sequelize.service';
import {DatabaseService} from '../services/database-connection.service';
import {Database} from '../../models/database';

@Component({
  selector: 'app-sequelize-automate-generate-models',
  templateUrl: './sequelize-automate-generate-models.component.html',
  styleUrls: ['./sequelize-automate-generate-models.component.css']
})
export class SequelizeAutomateGenerateModelsComponent implements OnInit {
  selectedDatabase: Database;
  databases: Database[];
  constructor(private dbService: DatabaseService,
    private seqService: SequelizeService) { }

  async ngOnInit(): Promise<void> {
    this.databases = await this.dbService.getDatabaseConnections();
  }

  submit(): void{
    // no db selected, means 'ALl' option is selected
    if (!this.selectedDatabase){
      this.databases.forEach(db => {
        this.seqService.generateModels(db.id).then(resp => {
          alert(resp);
        }).catch(err => {
          alert(err);
        });
      });
    }
      else {
        this.seqService.generateModels(this.selectedDatabase.id).then(resp => {
          alert(resp);
        })
          .catch(err => {
          alert(err);
        });
      }
  }
}
