import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../_models/post';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-newest-posts',
  templateUrl: './newest-posts.component.html',
  styleUrls: ['./newest-posts.component.css']
})
export class NewestPostsComponent implements OnInit {
  posts: Post[];

  constructor(private authService: AuthService, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.posts = data['posts'];
    //   console.log(this.posts);
    // });
    this.loadPosts();
  }

  loadPosts() {
    return this.postService.getNewestPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

}
