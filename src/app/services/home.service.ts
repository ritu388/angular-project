import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  StudentData = [
    {
      "Id": 1,
      "Name": 'Ritu Pandey',
      "RollNo" : 12,
      "DateOFBirth": '15 Jan 2000'
    },
     {
       "Id": 3,
       "Name": 'Babbu Pandey',
       "RollNo": 45,
       "DateOFBirth": '14 Dec 2016' 
     }
  ]
}
