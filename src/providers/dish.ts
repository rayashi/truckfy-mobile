import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import 'rxjs/add/operator/map';

import { APIHOST } from '../configs';
import { AuthService } from './auth';
import { Utils } from './utils';

@Injectable()
export class DishService {
  dishes: any[] = [];
  
  constructor(
    public http: Http,
    private authService: AuthService) {
    
  }

  listDishes(truckId:number){
    let params = new URLSearchParams();
    params.set('truck', truckId.toString());
    return this.http.get(APIHOST+'dish',{search:params})
      .map(res => res.json())
      .toPromise();
  }

  addDish(dish){
    dish.price = Utils.unMaskMoney(dish.maskedPrice);
    return this.http.post(APIHOST+'dish/',dish,{headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }

  updateDish(dish){
    dish.price = Utils.unMaskMoney(dish.maskedPrice);
    return this.http.put(APIHOST+'dish/'+dish.id,dish,{headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }

  deleteDish(dish){
    return this.http.delete(APIHOST+'dish/'+dish.id,{headers:this.authService.headers})
    .map(resp => resp.json()||{})
    .toPromise();
  }

}
