import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  // styleUrls: ['./add-data.component.scss' 
})
export class AddDataComponent implements OnInit {
studentData: FormGroup;
submitted: {};
data;
  constructor(
    public homeSearvice:HomeService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.createFormControl();
  }


  createFormControl() {
    this.studentData = new FormGroup ({
      Id: new FormControl(),
      Name: new FormControl(''),
      RollNo: new FormControl(),
      DateOFBirth: new FormControl(),
      Phone: new FormControl()
    });
  }

  setEditForm(data) {
    if(data) {
      Id: this.studentData.value.Id;
      Name: this.studentData.value.Name;
      RollNo: this.studentData.value.RollNo;
      DateOFBirth: this.studentData.value.DateOFBirth;
      Phone: this.studentData.value.Phone;
    }
  }
  submitData() {
    console.log('value of student data form', this.studentData);
    // this.data = this.homeSearvice.StudentData;
    this.homeSearvice.StudentData.push(this.studentData.value);
    console.log('data is successfully added', this.homeSearvice.StudentData)
    this.router.navigate([`Home-page`]);
  }
}
