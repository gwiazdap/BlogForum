import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { PostService } from '../_services/post.service';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})

export class EditGuard implements CanActivate, OnInit {
  post: Post;

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private postService: PostService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.post = data['post'];
      });
    }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.decodedToken.nameid === _route.params['userId']) {
      return true;
    }

    this.alertify.error('You cannot edit this post.');
    this.router.navigate(['/home']);
    return false;
  }
}
