import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  data;
  constructor(private router: Router,
    public homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.StudentData;
  }

  addnew(){
    this.router.navigateByUrl('Add-data');
  }
  getDataByJson() {

  }
}
