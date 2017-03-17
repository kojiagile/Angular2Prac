import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { PostService } from './post.service';

import { HttpModule, JsonpModule, Http, Jsonp, BaseRequestOptions, XHRBackend } from '@angular/http';
import { Response, ResponseOptions, ResponseType } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { Post } from '../post';

describe('PostService test', () => {
  
  beforeEach(() => {
    // To configure a testing module, we use Angular’s TestBed. 
    // TestBed is Angular’s primary API to configure and initialize environments for unit testing 
    // and provides methods for creating components and services in unit tests. 
    // We can create a module that overrides the actual dependencies with testing dependencies, 
    // using TestBed.configureTestingModule().
    TestBed.configureTestingModule({
      imports:[
        HttpModule, 
        JsonpModule,
      ],
      providers: [
        /*
          Tests should not rely on the real http/jsonp service (web api, etc.).
          Angular provides mock backend class.
          It ensures that no real http/jsonp requests are performed and 
          provides APIs to subscribe to opened connections and send mock responses.

          MockBackend provides APIs to not only subscribe to http/jsonp connections, 
          it also enables us to send mock responses. 
          What we want is, when the underlying Http/Jsonp service creates a connection 
          (performs a request), send a fake http/jsonp response.
        */
        // {
        //   provide: Http, useFactory: (backend, options) => {
        //     return new Http(backend, options);
        //   },
        //   deps: [MockBackend, BaseRequestOptions]
        // },

        // For Jsonp responses
        {
          provide: Jsonp, useFactory: (backend, options) => {
            return new Jsonp(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        PostService,
        BaseRequestOptions,
        MockBackend,
        // { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  });

  describe('1st tests', () => {
    it('true is true', () => expect(true).toBe(true));
  });

  describe('test getAllPosts()', () => {

    describe('When there are multiple posts retrieved.', () => {
      it('should return an Observable<Post[]>', 
        /* 
          Angular’s testing module comes with a helper function inject(), which injects service dependencies. 
          This turns out to be super handy as we don’t have to take care of getting access to the injector ourselves. 
          inject() takes a list of provider tokens and a function with the test code, 
          and it returns a function in which the test code is executed.
        */
        // async(inject([PostService, MockBackend], (postService: PostService, mockBackend: MockBackend) => {
        inject([PostService, MockBackend], (postService: PostService, mockBackend: MockBackend) => {
          /* Mock data  */
          const mockResponse = {
            data: [
              { id: 0, title: 'title 0', content: 'content 0', date: '15/03/2017' },
              { id: 1, title: 'title 1', content: 'content 1', date: '16/03/2017' },
              { id: 2, title: 'title 2', content: 'content 2', date: '17/03/2017' },
              { id: 6, title: 'title 6', content: 'content 6', date: '30/03/2017' },
            ]
          };
          /*
            Create a mock connection and get a mock data using MockBackend and MockConnection.
            This test does not rely on the real http service and can be tested using mock http/jsonp response.
          */
          mockBackend.connections.subscribe((connection: MockConnection) => {
            // const options: ResponseOptions = new ResponseOptions({body: 'hello'});
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse.data)
            })));
          });

          postService.getAllPosts().subscribe((posts: Post[]) => {
            // console.log(posts);
            // console.log(expect(posts.length).toBe(4));
            expect(posts.length).toBe(4);
            expect(posts[0].title).toEqual('title 0');
            expect(posts[1].title).toEqual('title 1');
            expect(posts[2].title).toEqual('title 2');
            expect(posts[3].title).toEqual('title 6');
          })
        // })) // async(inject(...)
        }) // inject(...)
      ) // it()
    }) // describe('When there are multiple posts retrieved.', () => {
    
    
    describe('When there are no posts retrieved.', () => {
      it('should return an Observable<Post[]>', 
        inject([PostService, MockBackend], (postService: PostService, mockBackend: MockBackend) => {
          /* Mock data  */
          const mockResponse = {
            data: []
          };
          mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse.data)
            })));
          });

          postService.getAllPosts().subscribe((posts: Post[]) => {
            expect(posts.length).toBe(0);
          })
        }) // inject(...)
      ) // it()
    }) // describe('When there are no posts retrieved.', () => {
    
    
    describe('When there is only one post retrieved.', () => {
      it('should return an Observable<Post[]>', 
        inject([PostService, MockBackend], (postService: PostService, mockBackend: MockBackend) => {
          /* Mock data  */
          const mockResponse = {
            data: [
              { id: 1, title: 'test title', content: 'test content\n can you see me?', date: '15/03/2017' },
            ]
          };
          mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse.data)
            })));
          });

          postService.getAllPosts().subscribe((posts: Post[]) => {
            expect(posts.length).toBe(1);
            expect(posts[0].title).toEqual('test title');
            expect(posts[0].content).toEqual('test content\n can you see me?');
            expect(posts[0].date).toEqual('15/03/2017');
          })
        }) // inject(...)
      ) // it()
    }) 
    

    // describe('When there is an error.', () => {
    //   it('should return an Observable<Post[]>', 
    //     inject([PostService, MockBackend], (postService: PostService, mockBackend: MockBackend) => {
    //       /* Mock data  */
    //       const mockResponse = {
    //         data: [
    //           { id: 1, title: 'test title', content: 'test content\n can you see me?', date: '15/03/2017' },
    //         ]
    //       };

    //       /*
    //         How do I test error()?? can't cause an error on purpose...
    //       */
    //       // Causing an error on purpose.
    //       // mockBackend.connections.subscribe((connection: MockConnection) => {
    //       //   connection.mockRespond(new Response(new ResponseOptions({
    //       //     body: JSON.stringify(mockResponse.data),
    //       //     type:ResponseType.Error, 
    //       //     status:404,
    //       //   })));
    //       // });
    //       mockBackend.connections.subscribe((connection: MockConnection) => {
    //       //   connection.mockRespond(new Response(new ResponseOptions({
    //       //     body: JSON.stringify(mockResponse.data),
    //       //     type:ResponseType.Error, 
    //       //     status:404,
    //       //   })))
    //         // connection.mockError(<any>new Response(new ResponseOptions({status: 404, type:ResponseType.Error, body: 'error'})));
    //         connection.mockError(new Response(new ResponseOptions({status: 404, type:ResponseType.Error, body: 'error'})) as any as Error);
    //         // connection.mockError(new Error('some error'));
    //       });

    //       postService.getAllPosts().subscribe((posts: Post[]) => {
    //         expect(posts).toBeNull();
    //       }),
    //       error => {
    //         expect(error).not.toBe(null);
    //         // fail(error);
    //       }
    //     }) // inject(...)
    //   ) // it()
    // });
    

    // TODO: test savePost() 






  });// describe('test getAllPosts()', () => {


})