import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  queryString: string;

  constructor(public authService: AuthService, private alertify: AlertifyService,
      private router: Router, private userService: UserService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/myposts']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  search(query: string) {
    return this.userService.searchUsers(query).subscribe(users => {
      this.router.navigate(['/users' + '/search'], { queryParams: { query: query}});
    }, error => {
      this.alertify.error(error);
    });
  }

}
