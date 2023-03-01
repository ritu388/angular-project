import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from 'src/app/services/demo-service.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent implements OnInit {
  dataList:any [] = [];
  dataPagi:any;
  countOfPage = 10
  constructor(public demoService: DemoServiceService) { }

  ngOnInit(): void {
    this.getDataList();
  }
  

  getDataList(){
    this.demoService.getDataList().subscribe((res:any) =>{
      if(res) {
        this.dataList = res;
        console.log('response of data', res);
      }
    })
  }

  ShowHide(divId) {
    if(document.getElementById(divId).style.display == 'none') {
      document.getElementById(divId).style.display='block';
   } else {
    document.getElementById(divId).style.display = 'none';
  }
}

  // addPagination(){
  //   let dataCount = this.dataList.length;
  //   console.log('dataCount', dataCount);
  //   for(dataCount = 0; dataCount < 100; dataCount++) {
  //     this.dataList.push(dataCount);
  //     this.dataPagi = this.addPageCount();
  //     console.log('pageList', this.dataPagi)
  //   }
  // }
  
  // addPageCount(){
  //   return Math.ceil( this.dataList.length / this.countOfPage)
  // }
}