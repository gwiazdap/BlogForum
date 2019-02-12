import { Component, OnInit } from '@angular/core';
import { CommentService } from '../_services/comment.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../_models/comment';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  pagination: Pagination;
  user: User;

  constructor(private commentService: CommentService, private alertifyService: AlertifyService,
    private route: ActivatedRoute, private userService: UserService, public authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.comments = data['comments'].result;
      this.pagination = data['comments'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(+this.route.snapshot.params['id'], this.pagination.currentPage, this.pagination.pageSize)
      .subscribe((result: PaginatedResult<Comment[]>) => {
      this.comments = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertifyService.error('Failed to load data');
    });
  }

  deleteComment(id: number) {
    this.alertifyService.confirm('Are you sure you want to delete this comment?', () => {
      this.commentService.deleteComment(id, this.authService.decodedToken.nameid).subscribe( () => {
        this.comments.splice(this.comments.findIndex(c => c.id === id), 1);
        this.alertifyService.success('Comment has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete the comment');
      });
    });
  }
}
