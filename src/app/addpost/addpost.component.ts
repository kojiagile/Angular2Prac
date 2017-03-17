import { Component } from '@angular/core';
import { Post } from '../post';
import {DatePipe} from "@angular/common"
import {PostService} from '../service/post.service'

@Component({
  selector: 'add-post',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})

export class AddPostComponent {
  post: Post;
  message: string;
  constructor(private postService: PostService) {
    this.post = new Post(1, 'title here', 'write a post', 'date');
  }
  
  save(): void {
    // store properties data into somewhere (in database?)
    let ret = this.postService.savePost(this.post).subscribe(ret => {
          // console.log("----- Value returned from post.service savePost()-----");
          // console.log(ret['result']);
          // console.log(ret);
          this.message = ret['result'];
          // this.posts = posts as Post[];
        }, 
        error => {
          console.log(error); //this.errorMessage = error
          this.message = error;
        })
  }
  
}
