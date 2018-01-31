import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APIHOST } from '../../configs';
import { AuthService } from '../../providers/auth';

@Injectable()
export class TruckService {

  constructor(public http: Http, public authService: AuthService) {
  }

  follow(truck_id){
    return this.http.post(APIHOST+'client/follow',{'truck':truck_id}, {headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise()
    .catch(error => console.log(error));
  }

  unfollow(truck_id){
    return this.http.post(APIHOST+'client/unfollow',{'truck':truck_id}, {headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise()
    .catch(error => console.log(error));
  }

  isFollowing(truck_id){
    let params: URLSearchParams = new URLSearchParams();
    params.set('truck', truck_id);

    return this.http.get(APIHOST+'client/is-following', {headers:this.authService.headers, search:params})
    .map(resp => resp.json()||{})
    .toPromise()
    .catch(error => console.log(error));
  }
}
