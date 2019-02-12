import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { PostComponent } from './post/post.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserPostResolver } from './_resolvers/user-post.resolver';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostEditResolver } from './_resolvers/post-edit.resolver';
import { EditGuard } from './_guards/edit.guard';
import { PostService } from './_services/post.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { NewestPostsComponent } from './newest-posts/newest-posts.component';
import { NewestPostsResolver } from './_resolvers/newest-posts.resolver';
import {TimeAgoPipe} from 'time-ago-pipe';
import { SearchedUsersComponent } from './searched-users/searched-users.component';
import { SearchUsersResolver } from './_resolvers/search-users.resolver';
import { AllPostsResolver } from './_resolvers/all-posts.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { CreatePostChangesGuard } from './_guards/create-post-changes.guard';
import { PostResolver } from './_resolvers/post.resolver';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentsResolver } from './_resolvers/comments.resolver';

export function tokenGetter() {
   return localStorage.getItem('token');
}


@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      RegisterComponent,
      AllPostsComponent,
      UserPostsComponent,
      UserListComponent,
      PostComponent,
      EditPostComponent,
      CreatePostComponent,
      NewestPostsComponent,
      TimeAgoPipe,
      SearchedUsersComponent,
      AddCommentComponent,
      CommentsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      CreatePostChangesGuard,
      AuthGuard,
      EditGuard,
      UserService,
      UserPostResolver,
      PostEditResolver,
      NewestPostsResolver,
      SearchUsersResolver,
      UserListResolver,
      AllPostsResolver,
      PostResolver,
      CommentsResolver,
      PreventUnsavedChanges,
      PostService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
