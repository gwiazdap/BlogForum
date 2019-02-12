import { Component, OnInit } from '@angular/core';
import { Post } from '../_models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { PostService } from '../_services/post.service';
import { findIndex } from 'rxjs/operators';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Post[];
  pagination: Pagination;

  constructor(public authService: AuthService, public route: ActivatedRoute,
      private alertifyService: AlertifyService, private postService: PostService, private router: Router,
        private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.posts = data['posts'].result;
      this.pagination = data['posts'].pagination;
    });
  }

  deletePost(id: number) {
    this.alertifyService.confirm('Are you sure you want to delete this post?', () => {
      this.postService.deletePost(id, this.authService.decodedToken.nameid).subscribe( () => {
        this.posts.splice(this.posts.findIndex(p => p.id === id), 1);
        this.alertifyService.success('Post has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete the post');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUserPosts();
  }

  loadUserPosts() {
    return this.userService.getUsersPosts(+this.route.snapshot.params['id'], this.pagination.currentPage, this.pagination.pageSize)
      .subscribe((result: PaginatedResult<Post[]>) => {
      this.posts = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }


}
