import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { PostComponent } from './post/post.component';
import { UserPostResolver } from './_resolvers/user-post.resolver';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostEditResolver } from './_resolvers/post-edit.resolver';
import { EditGuard } from './_guards/edit.guard';
import { CreatePostComponent } from './create-post/create-post.component';
import { NewestPostsResolver } from './_resolvers/newest-posts.resolver';
import { SearchedUsersComponent } from './searched-users/searched-users.component';
import { SearchUsersResolver } from './_resolvers/search-users.resolver';
import { AllPostsResolver } from './_resolvers/all-posts.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { CreatePostChangesGuard } from './_guards/create-post-changes.guard';
import { PostResolver } from './_resolvers/post.resolver';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsResolver } from './_resolvers/comments.resolver';
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'posts', component: AllPostsComponent, resolve: { posts: AllPostsResolver} },
            { path: 'users/:id/posts', component: UserPostsComponent, resolve: { posts: UserPostResolver} },
            { path: 'users', component: UserListComponent, resolve: { users: UserListResolver} },
            {path: 'users/search', component: SearchedUsersComponent, resolve: {users: SearchUsersResolver },
                runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
            { path: 'users/:id/newpost', component: CreatePostComponent, canDeactivate: [CreatePostChangesGuard]},
            { path: 'posts/:id', component: PostComponent, resolve: { post: PostResolver, comments: CommentsResolver} },
            { path: 'posts/:id/addcomment', component: AddCommentComponent},
            { path: 'posts/:id/edit/:userId', component: EditPostComponent, resolve: { post: PostEditResolver},
                canActivate: [EditGuard], canDeactivate: [PreventUnsavedChanges]},
            { path: '', component: EditGuard, resolve : { post: PostEditResolver }}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
