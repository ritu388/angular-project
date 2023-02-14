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
  asc = 0;
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
    // console.log('enter in sortTable function')
    // var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    //  let table = document.getElementById("table");
    //   console.log('table', table);
    //   switching = true;
    //   dir = "asc"; 
    //   while (switching) {
    //     switching = false;
    //     rows = table.rows;
    //     console.log('rows', rows)
    //     for (i = 1; i < (rows.length - 1); i++) {
    //       shouldSwitch = false;
    //       x = rows[i].getElementsByTagName("td")[n];
    //       console.log('x', x, )
    //       y = rows[i + 1].getElementsByTagName("td")[n];
    //       console.log('y', y,)
    //       if (dir == "asc") {
    //         console.log('enter in asc condition', dir)
    //         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
    //           console.log('ascending the number', x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
    //           shouldSwitch= true;
    //           break;
    //         }
    //       } 
    //       else if (dir == "desc") {
    //         console.log('enter in desc condition', dir)
    //         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
    //           console.log('descending the number ', x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
    //           shouldSwitch = true;
    //           break;
    //         }
    //       }
    //     }
    //     if (shouldSwitch) {
    //       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    //       switching = true;
    //       switchcount ++;      
    //     } 
    //     else {
    //       if (switchcount == 0 && dir == "asc") {
    //         dir = "desc";
    //         switching = true;
    //       }
    //     }
    //   }
    this.sort_Table(document.getElementById("table"), n);
  }

  sort_Table(table, col) {
    if(this.asc == 2) { this.asc = -1;} else {this.asc = 2;}
    let rows = table.tBodies[0].rows;
    let rlen = rows.length-1;
    let arr = new Array();
    let i, j, cells, clen;
    for(i = 0; i < rlen; i++) {
      cells = rows[i].cells;
      clen = cells.length;
      arr[i] = new Array();
      for(j = 0 ; j < clen; j++) {
        arr[i][j] = cells[j].innerHTML; 
      }
    }
    arr.sort((a, b) => {
      var retval=0;
      var col1 = a[col].toLowerCase().replace(',', '').replace('$', '').replace(' usd', '')
      var col2 = b[col].toLowerCase().replace(',', '').replace('$', '').replace(' usd', '')
      var fA=parseFloat(col1);
      var fB=parseFloat(col2);
      if(col1 != col2){
        if((fA==col1) && (fB==col2) ){ retval=( fA > fB ) ? this.asc : -1*this.asc; } //numerical
        else { retval=(col1 > col2) ? this.asc : -1*this.asc;}
      }
      return retval; 
    });
    for(var rowidx=0;rowidx<rlen;rowidx++){
      for(var colidx=0;colidx<arr[rowidx].length;colidx++){ table.tBodies[0].rows[rowidx].cells[colidx].innerHTML=arr[rowidx][colidx]; }
    }
   let hdr = table.rows[0].cells[col];
    if (this.asc == -1) {
      hdr.html((hdr).html() + '<span class="sortorder">▲</span>');
    } else {
      hdr.html((hdr).html() + '<span class="sortorder">▼</span>');
    }
  } 
  
}
