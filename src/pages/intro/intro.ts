import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClientTabsPage } from '../client-tabs/client-tabs';
import { AuthService } from '../../providers/auth';
import { RegisterPage } from '../register/register';

@Component({
  selector:'page-intro',
  templateUrl: 'intro.html'
})
export class Intro{
  constructor(public navCtrl: NavController, public authService: AuthService) {
  }

  onClient(){
    this.authService.setUserType('client');
    this.navCtrl.push(ClientTabsPage);
  }

  onTruck(){
    this.authService.setUserType('truck');
    this.navCtrl.push(RegisterPage);
  }
}
