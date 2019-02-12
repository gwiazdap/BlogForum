import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Post } from '../_models/post';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class UserPostResolver implements Resolve<Post[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private router: Router,
            private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.userService.getUsersPosts(+route.params['id'], this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/allposts']);
                return of(null);
            })
        );
    }
}
