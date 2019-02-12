import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';

@Injectable()
export class CreatePostChangesGuard implements CanDeactivate<CreatePostComponent> {
    canDeactivate(component: CreatePostComponent) {
        if (component.submitForm.dirty && !component.submitForm.submitted) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
