import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  deferredPrompt: any;
  showButton = false;

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
  constructor(private router: Router,
    public homeService: HomeService) { }

  ngOnInit(): void {
   console.log("data of service ", this.homeService.StudentData) 
  }

  addnew(){
    console.log("enter in  add new function")
    this.router.navigateByUrl('Add-data');
  }
  getDataByJson() {
this.data = this.homeService.StudentData;
  }


  openeditfunction(dataId){
    let navUrl = 'Add-data/edit/' + dataId;
    this.router.navigateByUrl(navUrl) 
  }

  openViewFunction(dataId){
    let navUrl = 'Add-data/view/' + dataId;
    this.router.navigateByUrl(navUrl) 
  }
  
  deleteRow(id){
    this.data = this.homeService.StudentData;
    for(let i = 0; i < this.data.length; ++i){
      console.log("data", this.data);
      if (this.data[i].Id === id) {
          this.data.splice(i,1);
          console.log('data is deleted', this.data)
      }
  }
  }
}
