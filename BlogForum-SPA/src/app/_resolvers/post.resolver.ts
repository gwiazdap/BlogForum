import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Post } from '../_models/post';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { PostService } from '../_services/post.service';


@Injectable()
export class PostResolver implements Resolve<Post[]> {

    constructor(private postService: PostService, private router: Router,
            private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.postService.getPost(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
