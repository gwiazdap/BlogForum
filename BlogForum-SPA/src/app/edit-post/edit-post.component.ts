import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Post } from '../_models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { PostService } from '../_services/post.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  post: Post;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
      private postService: PostService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.post = data['post'];
    }, error => {
      this.alertify.error('Problem loading your post');
    });
  }

  editPost() {
    return this.postService.editPost(this.post.id, this.authService.decodedToken.nameid, this.post).subscribe(() => {
      this.alertify.success('Post was edited');
      this.editForm.reset(this.post);
      this.router.navigate(['/users/' + this.authService.decodedToken.nameid + '/posts']);
    }, error => {
      this.alertify.error(error);
    });
  }

}
