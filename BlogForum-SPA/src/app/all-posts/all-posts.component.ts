import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { AlertifyService } from '../_services/alertify.service';
import { Post } from '../_models/post';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
      private postService: PostService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.posts = data['posts'].result;
      this.pagination = data['posts'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPosts();
  }

  loadPosts() {
    return this.postService.getPosts(this.pagination.currentPage, this.pagination.pageSize)
      .subscribe((result: PaginatedResult<Post[]>) => {
      this.posts = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
