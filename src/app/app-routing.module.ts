import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent }   from './post/post.component';
import { AddPostComponent }   from './addpost/addpost.component';
import { PostSearchComponent } from './post-search/post-search.component';

const routes: Routes = [
//   { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts',  component: PostComponent },
  { path: 'add',  component: AddPostComponent },
  { path: 'search',  component: PostSearchComponent },
];

//Pulls the routes into a variable. You might export it in future and it clarifies the Routing Module pattern.
// Adds RouterModule.forRoot(routes) to imports.
// Adds RouterModule to exports so that the components in the companion module have 
// access to Router declarables such as RouterLink and RouterOutlet.
// No declarations! Declarations are the responsibility of the companion module.
// Adds module providers for guard services if you have them; there are none in this example.
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
