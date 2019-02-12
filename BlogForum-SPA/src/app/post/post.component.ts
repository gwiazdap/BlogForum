import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { AlertifyService } from '../_services/alertify.service';
import { Post } from '../_models/post';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  user: User;

  constructor(private userService: UserService, private alertify: AlertifyService,
      private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.post = data['post'];
    }, error => {
      this.alertify.error(error);
    });
    // this.loadPost();
    // this.loadUser();
  }

  // loadUser() {
  //   this.userService.getUser(this.post.userId).subscribe(user => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  // loadPost() {
  //   this.postService.getPost(+this.route.snapshot.params['id']).subscribe((post) => {
  //     this.post = post;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
