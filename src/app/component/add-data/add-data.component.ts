import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
studentData: FormGroup;
  constructor() { }

  ngOnInit(){
  }


  createFormControl() {
    this.studentdata = new FormControl({

    })
  }
}
