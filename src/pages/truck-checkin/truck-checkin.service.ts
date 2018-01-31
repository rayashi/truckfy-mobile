
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APIHOST } from '../../configs';
import { AuthService } from '../../providers/auth';

@Injectable()
export class TruckCheckinService{
  constructor(
    private http: Http, 
    private authService: AuthService){}
  
  checkin(lat:number, lon:number){
    return this.http.post(APIHOST+'checkin', {latitude:lat, longitude:lon}, {headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }

  checkout(){
    return this.http.post(APIHOST+'checkout', {}, {headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }

  getActivedCheckin(){
    let params = new URLSearchParams();
    params.set('truck', this.authService.userAthenticated.truck.id.toString());
    return this.http.get(APIHOST+'actived-checkin',{search:params})
      .map(res => res.json())
      .toPromise();
  }
}