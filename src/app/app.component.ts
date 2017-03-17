import { Component } from '@angular/core';
import { Post } from './post';
import {DatePipe} from "@angular/common"
import { PostDirectiveDirective } from './post-directive.directive'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title:string = 'Practice Angular 2'; 
}
