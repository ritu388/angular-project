import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoServiceService {

  constructor(public http: HttpClient) { 
  }

  getDataList(){
    return this.http.get(`https://jsonplaceholder.typicode.com/posts`);
  }
}
