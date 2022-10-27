import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  public GENDER_LIST: any = [
    { id: 1, value: "Male" },
    { id: 2, value: "Female" }
  ];
  PAGINATION_OPTIONS: any[] = [10, 25, 50, 100];

  public SALUTATION_LIST: any = [
    { id: 'Mr', value: 'Mr.' },
    { id: 'Ms', value: 'Ms.' },
    { id: 'Mrs', value: 'Mrs.' }
  ];

  public USER_ROLE_LIST: any = [
    { id: 1, value: "User" }
  ];

  constructor() {
  }
}