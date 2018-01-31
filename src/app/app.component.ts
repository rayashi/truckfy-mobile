import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';

import { ClientTabsPage } from '../pages/client-tabs/client-tabs';
import { Intro } from '../pages/intro/intro';
import { AuthService } from '../providers/auth';
import { TruckTabsPage } from '../pages/truck-tabs/truck-tabs';

@Component({
  templateUrl: 'app.html'
}) 
export class MyApp implements OnInit {
  rootPage: Component;
  
  constructor(
    platform: Platform,
    private storage: Storage,
    public authService: AuthService,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private app: App
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
    this.authService.getToken()
    .then((token) => this.authService.setHeaders(token))
    .then(() => this.authService.getUserAuthenticated())
    .then(() => {
      this.storage.ready().then(()=>{
        this.authService.getUserType()
        .then(type =>{
          if(type=="client"){
            this.rootPage = ClientTabsPage;  
          }else if(type=='truck'){
            if(this.authService.isLoggedIn()){
              this.rootPage = TruckTabsPage;
            }else{
              this.rootPage = Intro;
            }
          }else{            
            this.storage.set('showIntro', true);
            this.rootPage = Intro;  
          }
        });
      });
    });
  }
}
