import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Post } from '../post';


@Injectable()
export class MockPostService {
  error: any;
  domain: string = 'http://localhost:81/';
  path_get_posts: string = 'get_posts.php';
  path_insert_post: string = 'insert_post.php'

  param_callback: string = 'callback=JSONP_CALLBACK';
  param_title: string = `title=`;
  param_content: string = `content=`;
  
  constructor(private http: Http, private jsonp: Jsonp) {}

  // Index of an array testResponseData.
  responseDataIndex = 0;

  // Test data. 
  testResponseData = [
    Observable.of([]),
    Observable.of([
            {id: 1, title: 'title 1', content: 'content 1',date: '15/03/2017'},
            {id: 2, title: 'title 2', content: 'content 2',date: '16/03/2017'},
            {id: 3, title: 'title 3', content: 'content 3',date: '17/03/2017'},
    ]),
  ];

  getAllPosts(): Observable<Post[]> {
    //   // let url = 'http://localhost:81/get_posts.php?callback=JSONP_CALLBACK';
    //   let url = this.domain + this.path_get_posts + '?' + this.param_callback;

    //   return this.jsonp.get(url)
    //                     .map(res=> res.json())
    //                     .catch(error => { console.log(error); return error; })
    // Return test data
    return this.testResponseData[this.responseDataIndex];
  }

  savePost(post: Post): Observable<string> {
    //access to WebAPI to store the post.
    if(post == null || 
        (post.title == null || post.title == "") || 
        (post.content == null || post.content == "")) {
        return Observable.of({result: 'Title and content are required.'})
                         .catch(ret => {return ret;});
    }

    // // let url = `http://127.0.0.1:81/insert_post.php?callback=JSONP_CALLBACK&title=${post.title}&content=${post.content}`;
    // let url = this.domain + this.path_insert_post + '?' + this.param_callback 
    //         + '&' + this.param_title + post.title + '&' + this.param_content + post.content;
    // url = encodeURI(url);
    // return this.jsonp.request(url, {method: 'Get'})
    //                 .map(res => res.json())
    //                 .catch(error => {
    //                     console.log(error.json());
    //                     // error.json();
    //                     // Observable.throw(error.json());
    //                     return error.json();
    //                 });
    return Observable.of('Title and content are required.');
  }

}
