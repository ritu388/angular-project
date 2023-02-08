import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }

  StudentData = [
    {
      // "DisplayName":'ID',
      "Id": 1,
      "Name": 'Ritu Pandey',
      "RollNo" : 12,
      "DateOFBirth": '15/01/2000',
      "Phone": 32324343, 
    },
     {
       "Id": 3,
       "Name": 'Babbu Pandey',
       "RollNo": 45,
       "DateOFBirth": '14/12/2016' ,
       "Phone": 32324343,
     },
  ]


  updateStudentData = [];

  getDateObject(dateString) {
    if (dateString) {
      const temp = new Date(dateString);
      const dateObj = {
        // tslint:disable-next-line:radix
        year: parseInt(String(temp.getFullYear())),
        // tslint:disable-next-line:radix
        day: parseInt(String(temp.getDate())),
        // tslint:disable-next-line:radix
        month: parseInt(String(temp.getMonth() + 1))
      };
      return dateObj;
    }
  }

  getDateString(dateObj) {
    console.log('dateobj asd', dateObj);
    const dateStr = `${dateObj.month}/${dateObj.day}/${dateObj.year}`;
    if (dateStr) {
      const newDate= new Date(dateStr);
      // if (newDate) {
        return newDate.toISOString();
      // }
    }

  }

  getCovidData(){
   return this.http.get(`${environment.api}/v4/min/timeseries.min.json`)
  }
}
