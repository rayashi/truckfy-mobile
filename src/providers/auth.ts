import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Request, RequestMethod, RequestOptions } from '@angular/http';  
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { APIHOST } from '../configs';
import { ResponseHandler } from './response-handler';

@Injectable()
export class AuthService {
  public token: string = '';
  public userType: string;
  public userAthenticated: any = {};
  public headers: Headers = new Headers();
  public simpleHeaders: any = {};

  constructor(
    private storage: Storage,
    private http: Http
    ) {}

  setToken(token:string){
    this.token = token;
    this.storage.ready().then(()=>{
      this.storage.set('token',token);
    });
    this.setHeaders(token);
    return token;
  }

  getToken(){
    if(this.token){
      return new Promise((resolve, reject) => {
        resolve(this.token);
      });
    }else{
      return this.storage.get('token')
      .then((token) => this.token = token);
    }
  }

  setUserType(type:string){
    this.userType = type;
    this.storage.ready().then(()=>{
      this.storage.set('userType',type);
    });
    return type;
  }
  getUserType(){
    if(this.userType){
      return new Promise((resolve, reject) => {
        resolve(this.userType);
      });
    }else{
      return this.storage.get('userType')
      .then((userType) => this.userType = userType);
    }
  }

  isLoggedIn(){
    return !!this.token;
  }
  
  setHeaders(token){
    if(token){
      this.headers.set('Authorization', `Token ${token}`);
      this.simpleHeaders = {'Authorization':`Token ${token}`};     
    }else{
      this.headers.delete('Authorization');
      this.simpleHeaders = {};     
    }
    return token;
  }

  login(username:string, password:string){  
    return this.http.post(APIHOST+'login', {username:username, password:password},{})
      .map(resp => resp.json()||{})
      .toPromise()
      .then(data => this.setToken(data.token))
      .then(token => this.setHeaders(token))
      .then(()=>this.getUserAuthenticated());
  }

  logout(){
    this.token = null;
    this.userAthenticated = {};
    this.headers.delete('Authorization');
    this.storage.remove('showIntro');
    this.storage.remove('userType');
    return this.storage.remove('token');
  }

  clientRegister(newClient){
    return this.http.post(APIHOST+'client/register', newClient)
    .map(resp => resp.json()||{})
    .toPromise()
    .then(data => this.setToken(data.token))
    .then(token => this.setHeaders(token))
    .then(()=>this.getUserAuthenticated());
  }
  
  clientUdate(client){
    return this.http.post(APIHOST+'truck/client', client, {headers:this.headers})
    .map(resp => resp.json()||{})
    .toPromise()
    .then((data)=>{
      if(!data.error){
        this.userAthenticated.client = data;
      }
    });
  }

  truckRegister(newClient){
    return this.http.post(APIHOST+'truck/register', newClient)
    .map(resp => resp.json()||{})
    .toPromise()
    .then(data => this.setToken(data.token))
    .then(token => this.setHeaders(token))
    .then(()=>this.getUserAuthenticated());
  }
  
  truckUdate(truck){
    return this.http.post(APIHOST+'truck/update', truck, {headers:this.headers})
    .map(resp => resp.json()||{})
    .toPromise()
    .then((data)=>{
      if(!data.error){
        this.userAthenticated.truck = data;
      }
    });
  }

  getUserAuthenticated(){
    if(this.headers.get('Authorization')){
      return this.http.get(APIHOST+'user-authenticated', {headers:this.headers})
      .map(resp => resp.json()||{})
      .toPromise()
      .then(data => {
        this.userAthenticated = data;
        this.setUserType(this.userAthenticated.userType);
      })
      .catch(error => console.log(error));
    }else{
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    }
  }
}

