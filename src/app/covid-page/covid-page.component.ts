import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-covid-page',
  templateUrl: './covid-page.component.html',
  styleUrls: ['./covid-page.component.scss']
})
export class CovidPageComponent implements OnInit {
  data: any[] = [];
  dataAcces: any[] = [];
  arrayOFObject:any [] = [];
  constructor(public homeService: HomeService) { }

  ngOnInit(): void {
    this.getCovidData();
  }

  getCovidData(){
    this.homeService.getCovidData().subscribe((res:any) =>{
      this.data = Object.entries(res.AN.dates)
      // this.data = res.AN.dates;
      console.log('data of covid', this.data);
      for(let i = 0 ; i<this.data.length; i++) {
        this.dataAcces.push(this.data[i])
        console.log('dataAccess array of array', this.dataAcces)
      }
      this.dataAcces = this.data.map((res) =>{
        return {
          lat: res[0],
          lng: res[1]
        }
      })
      
      console.log('dataAccess array of object', this.dataAcces)
      for(let i = 0; i < this.dataAcces.length; i++) {
        this.arrayOFObject.push(this.dataAcces[i].lng);
      }
      console.log('arrayOFObject', this.arrayOFObject)
    });
  }

  getPreviousPage() {

  }
  getNextPage(){

  }

}
