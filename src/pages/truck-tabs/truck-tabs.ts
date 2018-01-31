import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { TruckCheckinPage } from '../truck-checkin/truck-checkin';
import { TruckDishPage } from '../truck-dish/truck-dish';
import { TruckSettingPage } from '../truck-setting/truck-setting';

@Component({
  templateUrl: 'truck-tabs.html'
})
export class TruckTabsPage{
  tab1Root: any = TruckCheckinPage;
  tab2Root: any = TruckDishPage;
  tab3Root: any = TruckSettingPage;

  constructor(
    private navCtrl: NavController,
    private app: App) {}

  onSettings(){
    this.app.getRootNav().push(TruckSettingPage);
  }
}
