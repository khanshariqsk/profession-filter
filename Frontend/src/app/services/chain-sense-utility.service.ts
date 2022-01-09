import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChainSenseUtilityService {
  private credentials:any={};
  constructor() { }
  
  set cachingUsersData(data){
    this.credentials.users = data
  }

  get getCachedUsersData(){
    return this.credentials?.users
  }

  set setActiveFilterButton(data){
    this.credentials.active = data
  }

  get getActiveFilterButton(){
    return this.credentials?.active
  }
}
