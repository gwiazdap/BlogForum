import { Component, OnInit, ViewChild } from '@angular/core';
import { Comment } from '../_models/comment';
import { NgForm } from '@angular/forms';
import { CommentService } from '../_services/comment.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @ViewChild('submitForm') submitForm: NgForm;
  comment: any = {};

  constructor(private commentService: CommentService, private alertifyService: AlertifyService,
      private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  addComment() {
    console.log(this.comment);
    // console.log(this.route.snapshot.params['id']);
    this.commentService.addComment(+this.route.snapshot.params['id'], +this.authService.decodedToken.nameid, this.comment)
      .subscribe(() => {
        this.alertifyService.success('Comment was added');
        this.router.navigate(['/posts/', +this.route.snapshot.params['id']]);
      }, error => {
        this.alertifyService.error('Failed to add a comment');
      });
  }

}
