import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Post } from '../_models/post';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { CommentService } from '../_services/comment.service';


@Injectable()
export class CommentsResolver implements Resolve<Comment[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private commentService: CommentService, private router: Router,
            private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
        return this.commentService.getComments(+route.params['id'], this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/allposts']);
                return of(null);
            })
        );
    }
}
