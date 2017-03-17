import { PostDirectiveDirective } from './post-directive.directive';
import { PostSearchComponent } from './post-search/post-search.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement, NgModule }    from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { PostComponent } from './post.component';
import { AddPostComponent }   from './addpost.component';
import { PreviewPostComponent }   from './preview-post.component';

import {PostService} from './service/post.service'


describe('Test AppComponent', () => {
  beforeEach(async(() => {
    // To configure a testing module, use Angular’s TestBed. 
    // TestBed is Angular’s primary API to configure and initialize environments for unit testing 
    // and provides methods for creating components and services in unit tests. 
    // We can create a module that overrides the actual dependencies with testing dependencies, 
    // using TestBed.configureTestingModule().
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PostComponent,
        AddPostComponent,
        PreviewPostComponent,
        PostSearchComponent,
        PostDirectiveDirective,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        JsonpModule 
      ],
      providers: [PostService, { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'Practice Angular 2'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Practice Angular 2');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
