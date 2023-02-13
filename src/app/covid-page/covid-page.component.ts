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
  cPrev = -1;
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
    for (datalist = 0; datalist < 200; datalist++)
    this.arrayOFObject.push(datalist);
    this.addPageList = this.getCountOfPages();
    // console.log('this.addPageList', this.addPageList)
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
    //  console.log('list', list,this.addPageList.length)
    }
  }

  sortTable(n) {
    console.log('enter in sortTable function')
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("table");
      console.log('table', table);
      switching = true;
      dir = "asc"; 
      while (switching) {
        switching = false;
        rows = table.rows;
        console.log('rows', rows)
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[n];
          console.log('x', x, i)
          y = rows[i + 1].getElementsByTagName("td")[n];
          console.log('y', y, i + 1)
          if (dir == "asc") {
            console.log('enter in asc condition', dir)
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } 
          else if (dir == "desc") {
            console.log('enter in desc condition', dir)
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;      
        } 
        else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
  }
}
