import { PostDirectiveDirective } from './post-directive.directive';
import { PostSearchComponent } from './post-search/post-search.component';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement, NgModule }    from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostComponent } from './post.component';
import { AddPostComponent }   from './addpost.component';
import { PreviewPostComponent }   from './preview-post.component';

import {PostService} from './service/post.service';
import { MockPostService } from './service/mock.post.service';
import { Post } from './post';


describe('Test AppComponent', () => {
  beforeEach(async(() => {
    // To configure a testing module, we use Angular’s TestBed. 
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
        PostDirectiveDirective
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        JsonpModule 
      ],
      providers: [
        // Override PostService with MockPostService for testing.
        // If you want to set a value to a property in a service, 
        // do it via a component instance. 
        // Sample (setting 1 to postService.responseDataIndex).
          // const fixture = TestBed.createComponent(PostComponent);
          // const app = fixture.debugElement.componentInstance;
          // app.postService.responseDataIndex = 1;

        { provide: PostService, useClass: MockPostService },
        { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PostComponent);
    const app = fixture.debugElement.componentInstance;
    // expect(app).toBeTruthy();
    expect(app).toBeDefined();
  }));

  describe('Test showDetails() method', () => {
    it(`When the parameter is null`, async(() => {
      const fixture = TestBed.createComponent(PostComponent);
      const app = fixture.debugElement.componentInstance;
      let post = null;//new Post(1, "title 1", "test content", "15/03/2017");
      app.showDetail(post);
      expect(app.selectedPost).toBeNull();
    }));

    it(`When the parameter is a Post class object (not null)`, async(() => {
      const fixture = TestBed.createComponent(PostComponent);
      const app = fixture.debugElement.componentInstance;
      let post = new Post(1, "title 1", "test content", "15/03/2017");
      app.showDetail(post);
      expect(app.selectedPost.id).toEqual(1);
      expect(app.selectedPost.title).toEqual('title 1');
      expect(app.selectedPost.content).toEqual('test content');
      expect(app.selectedPost.date).toEqual('15/03/2017');
    }));
  });

  describe('Test getAllPosts() method', () => {
    // Remember that PostService is overridden.
    it(`When no values (empty array) are returned.`, 
      inject([ PostService ], (postService: PostService) => {
          const fixture = TestBed.createComponent(PostComponent);
          const app = fixture.debugElement.componentInstance;
          // Change the value so service.getAllPosts() returns empty response.
          app.postService.responseDataIndex = 0;

          app.ngOnInit();
          // console.log(app.posts);
          expect(app.posts.length).toBe(0);
      }));


    it(`When multiple values are returned.`, 
      inject([ PostService ], (postService: PostService) => {
          const fixture = TestBed.createComponent(PostComponent);
          const app = fixture.debugElement.componentInstance;
          // Change the value so service.getAllPosts() returns three response.
          app.postService.responseDataIndex = 1;

          app.ngOnInit();
          // console.log(app.posts);
          expect(app.posts.length).toBe(3);
          expect(app.posts[0].id).toBe(1);
          expect(app.posts[0].title).toBe('title 1');
          expect(app.posts[0].content).toBe('content 1');
          expect(app.posts[0].date).toBe('15/03/2017');
          
          expect(app.posts[1].id).toBe(2);
          expect(app.posts[1].title).toBe('title 2');
          expect(app.posts[1].content).toBe('content 2');
          expect(app.posts[1].date).toBe('16/03/2017');
          
          expect(app.posts[2].id).toBe(3);
          expect(app.posts[2].title).toBe('title 3');
          expect(app.posts[2].content).toBe('content 3');
          expect(app.posts[2].date).toBe('17/03/2017');
      }));

  }); // describe('Test getAllPosts() method', () => {


});
