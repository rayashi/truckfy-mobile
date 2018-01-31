import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { SearchService } from './search.service';
import { TruckPage } from '../truck/truck';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [SearchService]
})
export class SearchPage{
  trucks: any[] = [];
  lat:number;
  lon:number;
  nextPage:number = 1;
  pages: number = 1;
  gettingTrucks: boolean = false;
  public locationAgreed = false;

  constructor(
    private searchService:SearchService, 
    public navCtrl: NavController,
    public toast: ToastController,
    private app: App,
    public geolocation: Geolocation,
    public locationAccuracy: LocationAccuracy) {}

  getTrucksByLocation(refresh:boolean, infiniteScroll, refresher){
    this.searchService.getTrucks(this.lat,this.lon,this.nextPage)
      .then(data => {
        if(refresh)
          this.trucks = [];
        this.trucks = this.trucks.concat(data.neartrucks);
        this.pages = data.pages;
        this.nextPage++;
        if(infiniteScroll)
          infiniteScroll.complete();
        if(refresher)
          refresher.complete();
        this.gettingTrucks = false;  
      })
      .catch(error => {
        this.toast.create({message: 'Não consegui encontrar food trucks :(',duration: 3000}).present();
      });
  }

  getTrucks(refresh:boolean, infiniteScroll, refresher){
    if(!refresher){
      this.gettingTrucks = true;  
    }
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then((resp) =>{
          this.locationAgreed = true;
          this.getLocation().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;
            this.getTrucksByLocation(refresh, infiniteScroll, refresher);
          }).catch((error) =>{
            console.log('Error in locationAccuracy.request() = '+error);
          });
        },(error) => {
          if(refresher)
            refresher.complete();
          if(infiniteScroll)
            infiniteScroll.complete();
          this.locationAgreed = false;
          console.log('Error requesting location permissions', error);
        });
      }else{
        console.log('---> locationAccuracy.canRequest() returns canRequest false <--- ');
        this.locationAgreed = true;
        this.getLocation().then((resp) => {
          this.lat = resp.coords.latitude;
          this.lon = resp.coords.longitude;
          this.getTrucksByLocation(refresh, infiniteScroll, refresher);
        }).catch((error) =>{
          console.log('Error in geolocation.getCurrentPosition() = '+error);
        });
      }
    });
  }
  
  doInfinite(infiniteScroll) {
    if(this.nextPage <= this.pages){
      setTimeout(() => {
        this.getTrucks(false, infiniteScroll, null);  
      }, 500);
    }else{
      infiniteScroll.complete();
    }
  }

  doRefresh(refresher) {
    this.lat = null;
    this.lon = null;
    this.pages = 1;
    this.nextPage = 1;    
    this.getTrucks(true, null, refresher);
  }

  ionViewDidLoad(){
    this.doRefresh(null);
  }

  getLocation(){
    if(!this.lat || !this.lon){
      return this.geolocation.getCurrentPosition();
    }else{
      return new Promise((resolve, reject) => {
        resolve({coords:{latitude:this.lat, longitude:this.lon}});
      });
    }
  }

  goToTruckPage(truck){
    this.app.getRootNav().push(TruckPage, {truck:truck});
    // this.navCtrl.push(TruckPage, {truck:truck});
  }
}