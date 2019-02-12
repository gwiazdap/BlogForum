/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewestPostsComponent } from './newest-posts.component';

describe('NewestPostsComponent', () => {
  let component: NewestPostsComponent;
  let fixture: ComponentFixture<NewestPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
