import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

awsURL : string = 'http://rishiapp.ap-south-1.elasticbeanstalk.com';
localURL : string = 'http://localhost:5000';
  constructor(private _http: HttpClient) { }

  saveRestaurent(data:any){
    return this._http.post<any>(this.getURL()+"/saveRestaurent",data).pipe(map((res:any) => {
      return res;
    }))
  }

    saveReservation(data:any,id : any){
    return this._http.post<any>(this.getURL()+"/saveTableReservation/"+id,data).pipe(map((res:any) => {
      return res;
    }))
  }

  getRestaurents(){
    return this._http.get<any>(this.getURL()+"/getAllRestaurents").pipe(map((res) => {
      return res;
    }))
  }

  getReservationsForRest(id:any){
    return this._http.get<any>(this.getURL()+"/getAllReservationsForRestaurant/"+id).pipe(map((res) => {
      return res;
    }))
  }

  deleteRestaurent(id : any){
    return this._http.delete<any>(this.getURL()+"/deleteRestaurent/"+id).pipe(map((res) => {
      return res;
    }))
  }

  getURL(){
    let local = false;
    if (local){
      return this.localURL;
    }
    return this.awsURL;
  }

}
