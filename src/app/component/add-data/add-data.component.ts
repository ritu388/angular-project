import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  // styleUrls: ['./add-data.component.scss', 
})
export class AddDataComponent implements OnInit {
studentData: FormGroup;
submitted: {};
data;
dataId
  action: string;
  constructor(
    public homeSearvice:HomeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params:any) =>{
      if(params) {
        this.dataId = params.dataID;
      }
    })
   }

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
      // Id: this.studentData.value.Id;
      // Name: this.studentData.value.Name;
      // RollNo: this.studentData.value.RollNo;
      // DateOFBirth: this.studentData.value.DateOFBirth;
      // Phone: this.studentData.value.Phone;
      this.studentData.get('Id').setValue(data.Id);
      this.studentData.get('Name').setValue(data.Name);
      this.studentData.get('RollNo').setValue(data.RollNo);
      this.studentData.get('DateOFBirth').setValue(data.DateOFBirth);
      this.studentData.get('Phone').setValue(data.Phone);
    }
  }
  submitData() {
    const dataForm = {
      Id: this.studentData.value.Id,
      Name: this.studentData.value.Name,
      RollNo: this.studentData.value.RollNo,
      DateOFBirth: this.studentData.value.DateOFBirth,
      Phone: this.studentData.value.Phone,
    };
    const userData = {};
    if(dataForm) {
      for(let prop in dataForm) {
        dataForm[prop] = userData[prop];
      }
    }
      console.log('value of student data form', userData);
      // this.data = this.homeSearvice.StudentData;
      this.homeSearvice.StudentData.push(this.studentData.value);
      console.log('data is successfully added', this.homeSearvice.StudentData)
      this.router.navigate([`Home-page`]);
  }
}