import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Post } from '../_models/post';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('submitForm') submitForm: NgForm;
  post: any = {};
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.submitForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private userService: UserService, private alertify: AlertifyService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  createPost() {
    this.userService.createPost(+this.authService.decodedToken.nameid, this.post).subscribe(() => {
      this.alertify.success('Post was created');
      this.router.navigate(['/users/' + this.authService.decodedToken.nameid + '/posts']);
    }, error => {
      this.alertify.error('Failed to create the post');
    });
  }

}
