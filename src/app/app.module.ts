import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent }   from './addpost/addpost.component';
import { PreviewPostComponent }   from './preview-post/preview-post.component';

import {PostService} from './service/post.service';
import { PostDirectiveDirective } from './post-directive.directive';
import { PostSearchComponent } from './post-search/post-search.component'

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AddPostComponent,
    PreviewPostComponent,
    PostDirectiveDirective,
    PostSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JsonpModule 
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
