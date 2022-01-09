import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChainSenseApiService {

  private BaseUrl:string = "http://localhost:8080/api" 
  constructor(private http:HttpClient) { }

  getAllUsersData(){
    return this.http.get(this.BaseUrl+'/get-all-users').toPromise()
  }

  getUsersByProfession(prof:String){
    return this.http.get(this.BaseUrl + "/users/" + prof).toPromise()
  }

  setUserData(credentials:FormData){
    return this.http.post(this.BaseUrl+'/create-user',credentials).toPromise()
  }

}
