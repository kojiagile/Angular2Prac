import { Component, Input } from '@angular/core';
import { Post } from '../post';
import {DatePipe} from "@angular/common"

@Component({
  selector: 'preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.css']
})

export class PreviewPostComponent {
   @Input() previewPost:Post;

//   showDetail(post: Post): void {
//     this.selectedPost = post;
//   }
  
}
