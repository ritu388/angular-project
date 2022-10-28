import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
studentData: FormGroup;
submitted: {};
  constructor() { }

  ngOnInit(){
  }


  createFormControl() {
    this.studentData = new FormGroup ({
      ID: new FormControl(),
      Name: new FormControl(''),
      RollNo: new FormControl(),
      DOB: new FormControl()
    });
  }

  setEditForm(data) {
    if(data) {
      ID: this.studentData.value.ID;
      Name: this.studentData.value.Name;
      RollNo: this.studentData.value.RollNo;
      DOB: this.studentData.value.DOB;
    }
  }
  submitData(value) {
    console.log('value of student data form', value);
  }
}
