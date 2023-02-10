import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-covid-page',
  templateUrl: './covid-page.component.html',
  styleUrls: ['./covid-page.component.scss']
})
export class CovidPageComponent implements OnInit {
  searchKey = Number;
  data: any[] = [];
  dataAcces: any[] = [];
  arrayOFObject:any [] = [];
  searchText;
  addPageList: any;
  presentPage = 1;
  countPerEachPage = 10;
  countOfPages = 0;
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
    console.log('enter in getPreviousPage function')
    this.presentPage -= 1;
    this.loadMyPaginationList();
  }
  getNextPage(){
    console.log('enter in getNextPage function')
    this.presentPage += 1; 
    this.loadMyPaginationList();
  }

  prepareList(){
    let datalist = this.arrayOFObject.length;
    for (datalist = 0; datalist < 100; datalist++)
    this.arrayOFObject.push(datalist);
    this.addPageList = this.getCountOfPages();
  }
  getCountOfPages(){
    return Math.ceil(this.arrayOFObject.length / this.countPerEachPage);
  }
  loadMyPaginationList() {
    console.log('enter in loadmypaginationlist ')
    var start = ((this.presentPage - 1) * this.countPerEachPage);
    console.log('start', start);
    var end = start + this.countPerEachPage;
    console.log('end',end, 'counter per each page', this.countPerEachPage)
    this.addPageList = this.arrayOFObject.slice(start, end);
    console.log('addpageList', this.addPageList)
    this.createPageList();
  }

  createPageList() {
    console.log('enter in create PageList')
    document.getElementById("countList").innerHTML = "";
    let p : any;
    for (p = 0; p < this.addPageList.length; p++) {
     let list =  document.getElementById("countList").innerHTML = document.getElementById("countList").innerHTML + this.addPageList[p] + "<br/>";
     console.log('list', list,this.addPageList.length)
    }
  }

}
