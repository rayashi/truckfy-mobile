import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APIHOST } from '../../configs';
import { AuthService } from '../../providers/auth';

@Injectable()
export class FollowingService {

  constructor(public http: Http, public authService: AuthService) {
  }

  listFollowing(){
    return this.http.get(APIHOST+'client/list-following', {headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise()
    .catch(error => console.log(error));
  }
}
