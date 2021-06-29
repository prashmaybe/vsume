import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { HomeTemplate } from './templates/home/home';
import { PageNotFoundTemplate } from './templates/page-not-found/page-not-found';
import {NgxTypedJsComponent, NgxTypedJsModule} from 'ngx-typed-js';
@NgModule({
  declarations: [
    AppComponent,
    HomeTemplate,
    PageNotFoundTemplate
  ],
  imports: [
    FormsModule,
		ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgxTypedJsModule
  ],
  exports: [
    FormsModule
  ],
  providers: [
    NgxTypedJsModule,
    NgxTypedJsComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
