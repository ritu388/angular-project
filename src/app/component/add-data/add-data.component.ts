import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
// import {ModalDismissReasons, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  // styleUrls: ['./add-data.component.scss', 
})
export class AddDataComponent implements OnInit {
studentData: FormGroup;
submitted: {};
data;
dataId;
disableSubmit = true;
action: string;
userData;
submitHeader;
submitMsg;
// @ViewChild('confirmationModal', {static: true}) confirmationModal: NgbModal;

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
    this.getDataById();
  }


  createFormControl() {
    this.studentData = new FormGroup ({
      Id: new FormControl({value: '', disabled: this.action === 'view'}, {validators: [Validators.required]}),
      Name: new FormControl({value: '', disabled: this.action === 'view'}, {validators: [Validators.required]}),
      RollNo: new FormControl({value: '', disabled: this.action === 'view'}, {validators: [Validators.required]}),
      DateOFBirth: new FormControl({value: '' , disabled: this.action === 'view'}, {validators: [Validators.required]}),
      Phone: new FormControl({value: '', disabled: this.action === 'view'}, {validators: [Validators.required]})
    });
  }

  setEditForm(data) {
    console.log('enter in seteditform',data)
    if(data) {
      this.studentData.get('Id').setValue(data.Id);
      this.studentData.get('Name').setValue(data.Name);
      this.studentData.get('RollNo').setValue(data.RollNo);
      this.studentData.get('DateOFBirth').setValue(data.DateOFBirth);
      this.studentData.get('Phone').setValue(data.Phone);
    }
    if(this.action === 'view') {
      console.log('enter in view condition');
      this.studentData.disable();
      console.log('this.studentData.disable()',this.studentData.disable())
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
    } if(this.action === 'edit') {
      this.homeSearvice.updateStudentData.push(userData);
      console.log('form data is updated')
    } else {
      console.log('value of student data form', userData);
      // this.data = this.homeSearvice.StudentData;
      this.homeSearvice.StudentData.push(this.studentData.value);
      console.log('data is successfully added', this.homeSearvice.StudentData)
      this.router.navigate([`Home-page`]);
    }
      
  }


  getDataById() {
    this.userData = this.homeSearvice.StudentData;
      let obj = this.userData.find((ele) => ele.Id == this.dataId);
      console.log("userData", obj)
      this.setEditForm(obj);
  }
  
  routeDashboardAfterConfirmation(){
    if (this.action === 'add') {
      this.router.navigate(['tools']);
    } else if (this.action === 'edit') {
      this.router.navigate(['tools']);
    }
  }
  


}