import { Component } from '@angular/core';
import { NgxTypedJsComponent } from 'ngx-typed-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vidApp';
  constructor(
    public ngxTypedJsComponent:NgxTypedJsComponent
  ){

  }
}
