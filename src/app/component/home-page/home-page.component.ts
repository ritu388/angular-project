import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  deferredPrompt: any;
  showButton = false;
  dataArray;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  data;
  constructor(private router: Router, public homeService: HomeService) {}

  ngOnInit(): void {
    console.log('data of service ', this.homeService.StudentData);
  }

  addnew() {
    console.log('enter in  add new function');
    this.router.navigateByUrl('Add-data');
  }
  getDataByJson() {
    this.data = this.homeService.StudentData;
  }

  openeditfunction(dataId) {
    let navUrl = 'Add-data/edit/' + dataId;
    this.router.navigateByUrl(navUrl);
  }

  openViewFunction(dataId) {
    let navUrl = 'Add-data/view/' + dataId;
    this.router.navigateByUrl(navUrl);
  }

  deleteRow(id) {
    this.data = this.homeService.StudentData;
    for (let i = 0; i < this.data.length; ++i) {
      console.log('data', this.data);
      if (this.data[i].Id === id) {
        this.data.splice(i, 1);
        console.log('data is deleted', this.data);
      }
    }
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = evt.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  uploadExcel() {
    const obj = {};
    this.dataArray = [];
    const ecnDatas = {};
    for (let i = 0; i < this.data[0].length; i++) {
      if (this.data[0][i].includes('/')) {
        this.data[0][i] = this.data[0][i].replace('/', '_x002f_');
      }
      ecnDatas[this.data[0][i]] = null;
    }
    for (let i = 1; i < this.data.length; i++) {
      if (this.data && this.data.length > 0) {
        for (let j = 0; j < this.data[i].length; j++) {
          if (this.data[i][j]) {
            ecnDatas[this.data[0][j]] = this.data[i][j];
          } else {
            ecnDatas[this.data[0][j]] = null;
          }
        }

        for (let prop in ecnDatas) {
          console.log('data is in tactplan body', prop);
          if (ecnDatas[prop]) {
            if (prop === 'DateOfBirth') {
              obj[prop] = new Date(ecnDatas[prop]).toISOString();
            } else {
              obj[prop] = ecnDatas[prop];
            }
          }
        }
      }
      console.log('obj', obj);
      this.homeService.StudentData.push(this.dataArray.value);
    }
  }
}
