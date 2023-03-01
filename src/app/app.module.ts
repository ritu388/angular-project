import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AddDataComponent } from './component/add-data/add-data.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaginationPipe } from './pagination.pipe';
import { CovidPageComponent } from './covid-page/covid-page.component';
import { DemoPageComponent } from './component/demo-page/demo-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddDataComponent,
    PaginationPipe,
    CovidPageComponent,
    DemoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
