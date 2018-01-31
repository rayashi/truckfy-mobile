import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AuthService } from '../../providers/auth';
import { NavController } from 'ionic-angular';
import { FollowingService } from './following.service';
import { TruckPage } from '../truck/truck';

@Component({
  selector: 'page-following',
  templateUrl: 'following.html'
})
export class FollowingPage {
  trucks: any[] = [];
  gettingTrucks: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    private followingService: FollowingService,
    private app: App,
    public toast: ToastController) {
  }

  ionViewDidEnter() {
    this.followingService.listFollowing()
    .then(data => {
      if(data){
        this.trucks = data.following;
      }
      this.gettingTrucks = false;  
    });
  }

  goToTruckPage(truck){
    this.app.getRootNav().push(TruckPage, {truck:truck});
    // this.navCtrl.push(TruckPage, {truck:truck});
  }

  ionViewCanEnter(){
    return this.authService.isLoggedIn();
  }
}
