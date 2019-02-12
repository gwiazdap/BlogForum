import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { ActivatedRoute, Params } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-searched-users',
  templateUrl: './searched-users.component.html',
  styleUrls: ['./searched-users.component.css']
})
export class SearchedUsersComponent implements OnInit {
  users: User[];
  params: any;
  pagination: Pagination;

  constructor(private userService: UserService, private route: ActivatedRoute, private alertifyService: AlertifyService) {   }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.users = data['users'].result;
        this.pagination = data['users'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.route.queryParams.subscribe(params => this.params = params);
    return this.userService.searchUsers(this.params.query, this.pagination.currentPage, this.pagination.pageSize)
      .subscribe((result: PaginatedResult<User[]>) => {
      this.users = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }


}
