import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EditPostComponent> {
    canDeactivate(component: EditPostComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
