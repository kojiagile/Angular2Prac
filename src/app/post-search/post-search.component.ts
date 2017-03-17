import { PostService } from './../service/post.service';
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Location }          from '@angular/common';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  posts: Observable<Post[]>;
  searchTerm = new Subject<string>();
  selectedPost: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.searchTerm.debounceTime(300).distinctUntilChanged()
        .switchMap(term => term ? this.postService.titleSearch(term) : Observable.of<Post[]>([]))
        .catch(error => {
          // TODO: add real error handling
          console.log(error);
          return Observable.of<Post[]>([]);
        });
  }

  titleSearch(term: string): void {
    this.searchTerm.next(term);
  }

  select(post: Post): void {
    this.selectedPost = post;
  }

}
