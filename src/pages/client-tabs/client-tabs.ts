import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { AboutPage } from '../about/about';
import { FollowingPage } from '../following/following';
import { ClientProfilePage } from '../client-profile/client-profile';
import { LoginPage } from '../login/login';
 
@Component({
  templateUrl: 'client-tabs.html'
})
export class ClientTabsPage{
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SearchPage;
  tab2Root: any = AboutPage;
  tab3Root: any = FollowingPage;
  tab4Root: any = ClientProfilePage;

  constructor(
    private navCtrl: NavController,
    private app: App) {}

  onProfile(){
    this.app.getActiveNav().push(ClientProfilePage)
    .catch(() => this.app.getRootNav().push(LoginPage));
  }

  onFollowing(){
    this.app.getActiveNav().push(FollowingPage)
    .catch(() => this.app.getRootNav().push(LoginPage));
  }
}
