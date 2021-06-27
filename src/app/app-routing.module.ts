import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundTemplate } from './templates/page-not-found/page-not-found';
import { HomeTemplate } from './templates/home/home';

const routes: Routes = [
  {
    path: 'home',
    component: HomeTemplate,
		data: { title: 'Home' }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
		path: '**',
		component: PageNotFoundTemplate,
		data: { title: 'Error - 404 | Page Not Found' }
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
