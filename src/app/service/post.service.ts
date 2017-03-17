import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Post } from '../post';


//
// Dependency injection is a way to supply a new instance of a class with the fully-formed dependencies it requires. 
// Most dependencies are services. Angular uses dependency injection to provide new components with the services they need.
// Angular can tell which services a component needs by looking at the types of its constructor parameters. 
// For example, the constructor of your HeroListComponent needs a HeroService:
//  constructor(private service: HeroService) { }
// When Angular creates a component, it first asks an injector for the services that the component requires.

// Service is a broad category encompassing any value, function, or feature that your application needs.
// Almost anything can be a service. A service is typically a class with a narrow, well-defined purpose. 
// It should do something specific and do it well.
// Examples include:
// logging service
// data service
// message bus
// tax calculator
// application configuration
// 
// Yet services are fundamental to any Angular application. 
// Components are big consumers of services.
// 
@Injectable()
export class PostService {
  error: any;
  domain: string = 'http://localhost:81/';
  path_get_posts: string = 'get_posts.php';
  path_insert_post: string = 'insert_post.php'
  path_search_by_title: string = 'search_by_title.php'

  param_callback: string = 'callback=JSONP_CALLBACK';
  param_title: string = `title=`;
  param_content: string = `content=`;
  
  constructor(private http: Http, private jsonp: Jsonp) {}

  titleSearch(terms: string): Observable<Post[]> {
        let url = this.domain + this.path_search_by_title + '?' + this.param_callback
                + '&' + this.param_title + terms;
        
        console.log(url);
        // return this.jsonp.request(url, { method: 'Get' })
        return this.jsonp.get(url)
        .map(res=> {
            // console.log(terms);
            // console.log(res.json());
            return res.json() as Post[]
        })
        .catch(error => { console.log(error); return Observable.of<Post[]>([]); })
  }
  
  getAllPosts(): Observable<Post[]> {
      // let url = 'http://localhost:81/get_posts.php?callback=JSONP_CALLBACK';
      let url = this.domain + this.path_get_posts + '?' + this.param_callback;

      // return this.jsonp.request(url, { method: 'Get' })
      return this.jsonp.get(url)
                        //
                        // ================= Note ====================
                        // When {} is used for an Arrow function, return keyword needs to be used to return data.
                        // When {} is not used (e.g. .map(res => res.json()) ), return keyword is not required.
                        // This is how Arrow function works..?
                        // 
                        // .map(res => {
                        //     // console.log(res.json());
                        //     return res.json();// as Post[];
                        // })

                        // With the map operator, we call the .json method on the response 
                        // because the actual response is not a collection of data but a JSON string.
                        .map(res=> res.json())
                        .catch(error => { console.log(error); return error; })

        // 
        // What are .map(), subscribe(), and other methods such as filter()? 
        // See the website below:
        // https://angular-2-training-book.rangle.io/handout/observables/observables_array_operations.html
        // 
        // map will create a new array with the results of calling a provided function on every element in this array. 
        // In this example we used it to create a new result set by iterating through each item 
        // and appending the "Dr." abbreviation in front of every user's name. 
        // Now every object in our array has "Dr." prepended to the value of its name property.
        // 
        // Now when our subscribe callback gets invoked, 
        // the data it receives will be a list of JSON objects whose id properties are greater than or equal to six 
        // and whose name properties have been prepended with Dr..
        // 
        // http.get('http://jsonplaceholder.typicode.com/users/')
        // .flatMap((response) => response.json())
        // .filter((person) => person.id > 5)
        // .map((person) => "Dr. " + person.name)
        // .subscribe((data) => {
        //   this.doctors.push(data);
        // });

        /*
         * An example code with explanation 
         */
        // this.http.get('/api/v1/tasks.json')
        //       // initial transform - result to json
        //       .map( (responseData) => {
        //         return responseData.json();
        //       })
        //       // next transform - each element in the 
        //       // array to a Task class instance
        //       .map((tasks: Array<any>) => {
        //           let result:Array<Task> = [];
        //           if (tasks) {
        //           tasks.forEach((task) => {
        //             result.push(new Task(task.id, task.description, 
        //                                  task.dueDate, task.complete));
        //           });
        //         }
        //       })
        //       // subscribe to output from this observable and bind
        //       // the output to the component when received
        //       .subscribe( res => this.tasks = res);
        //     }
  }

  savePost(post: Post): Observable<string> {
    //access to WebAPI to store the post.
    if(post == null || 
        (post.title == null || post.title == "") || 
        (post.content == null || post.content == "")) {
        return Observable.of({result: 'Title and content are required.'})
                            .catch(ret => {return ret;});
        // return Observable.of('Title and content are required.');
                         
    }

    // let url = `http://127.0.0.1:81/insert_post.php?callback=JSONP_CALLBACK&title=${post.title}&content=${post.content}`;
    let url = this.domain + this.path_insert_post + '?' + this.param_callback 
            + '&' + this.param_title + post.title + '&' + this.param_content + post.content;
    url = encodeURI(url);
    return this.jsonp.request(url, {method: 'Get'})
                    // .map(res => {
                    //     console.log(res);
                    //     console.log(res.json());
                    //     return res.json() as string
                    //     // If you want response data as string, use text() method.
                    //     // return res.text();
                    // })
                    .map(res => res.json())
                    .catch(error => {
                        console.log(error.json());
                        // error.json();
                        // Observable.throw(error.json());
                        return error.json();
                    });
  }

//   search(term: string): Observable<Hero[]> {
//     return this.http
//                .get(`app/heroes/?name=${term}`)
//                .map(response => response.json().data as Hero[]);
//   }



}
