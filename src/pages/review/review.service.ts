import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APIHOST } from '../../configs';
import { AuthService } from '../../providers/auth';

@Injectable()
export class ReviewService{
  constructor(private http: Http, private authService: AuthService){}
  
  makeReview(review){    
    return this.http.post(APIHOST+'make-review', review, {headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }
}