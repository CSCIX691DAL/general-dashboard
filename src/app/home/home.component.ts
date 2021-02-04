import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database-connection.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  constructor(private conn: DatabaseService) {
  }

  ngOnInit(): void {
  }

  listUsers(): void{
    this.conn.getUsers().subscribe(data =>{
      console.log(data);
    });
  }
  listUser(): void{
    this.conn.getUser('Xiappi').subscribe(data =>{
      console.log(data);
    });
  }
  createUser(): void{
    this.conn.createUser('Xiappi', 'Adam', 'Mattatall', 'Password123'  ).subscribe(data =>{
      console.log(data);
    });
  }

  deleteUser(): void{
    this.conn.deleteUser('Xiappi' ).subscribe(data =>{
      console.log(data);
    });
  }
}
