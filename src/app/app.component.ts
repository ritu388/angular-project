import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';
  data: any;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8000/api/Home-page').subscribe(data => {
      this.data = data['Name'];
      console.log('this.data', this.data);
    }, error => console.error(error));
  }
}
