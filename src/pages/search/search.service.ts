import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APIHOST } from '../../configs';
import { AuthService } from '../../providers/auth';

@Injectable()
export class SearchService{
  constructor(private http: Http, private authService: AuthService){}
  
  getTrucks(lat:number, lon:number, page:number){    
    let params: URLSearchParams = new URLSearchParams();
    params.set('latitude', lat.toString());
    params.set('longitude', lon.toString());
    params.set('page', page.toString());

    return this.http.get(APIHOST+'near-trucks', {search:params, headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }
}