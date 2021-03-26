import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {DatabaseService} from '../services/database-connection.service';
import {User} from '../../models/users';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {

  Users: User[];
  constructor( public auth: AuthService, private router: Router, public conn: DatabaseService, public usersConn: UsersService) {
    if (auth.isAdmin() === false){
      this.router.navigate(['/home']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.Users = await this.conn.getUsers();
  }

  async deleteUser(user: string): Promise<void> {
    await this.usersConn.deleteUser(user);
  }
}
