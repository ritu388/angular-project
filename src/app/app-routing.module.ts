import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './component/add-data/add-data.component';
import { DemoPageComponent } from './component/demo-page/demo-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { CovidPageComponent } from './covid-page/covid-page.component';

const routes: Routes = [
  { path: 'Home-page', component: HomePageComponent },
  { path: 'Add-data', component: AddDataComponent},
  { path: 'Add-data/:action/:dataID', component: AddDataComponent},
  { path: 'covid-page', component: CovidPageComponent},
  { path: 'demo-page', component: DemoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
