import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { DatePipe } from "@angular/common"
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
// Observable class extensions
import 'rxjs/add/observable/of';

import {PostService} from '../service/post.service'
import { PostDirectiveDirective } from '../post-directive.directive'

@Component({
  selector: 'post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {
  selectedPost:Post;
  errorMessage: string = null;
  posts: Post[];
  color = 'yellow';

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    // Get post data from Web API
    this.postService.getAllPosts()
      .subscribe(posts => {
          // console.log("----- Value returned from post.service -----");
          // console.log(posts);
          this.posts = posts as Post[];
        }, 
        error => {
          console.log(error); //this.errorMessage = error
        })
  }

  showDetail(post: Post): void {
    // Show selected post's content on right side of the page.
    this.selectedPost = post;
  }
  
}
