import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/map';

import { APIHOST } from '../configs';

@Injectable()
export class ReviewService {
  dishes: any[] = [];
  
  constructor(public http: Http) {
  }

  listReviews(truckId:number, page: number){
    let params = new URLSearchParams();
    params.set('truck', truckId.toString());
    params.set('page', page.toString());
    return this.http.get(APIHOST+'review',{search:params})
      .map(resp => resp.json()||{})
      .toPromise()
      .catch(error => console.log("Error getting reviews:"+error));
  }

}
