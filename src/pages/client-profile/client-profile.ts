import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { AuthService } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Intro } from '../intro/intro';

@Component({
  selector: 'page-client-profile',
  templateUrl: 'client-profile.html'
})
export class ClientProfilePage {
  private loading: any;
  private token: any;
  private session: any = {userType:null,client:{}};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    private app: App,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({content: "Saindo .."});
  }

  onLogout(){
    this.loading.present();
    this.authService.logout()
    .then(()=>{
      this.loading.dismiss();
      this.app.getRootNav().setRoot(Intro);
    });
  }

  ionViewDidLoad() {
    this.session = this.authService.userAthenticated;
  }

  ionViewCanEnter(){
    return this.authService.isLoggedIn();
  }
}
