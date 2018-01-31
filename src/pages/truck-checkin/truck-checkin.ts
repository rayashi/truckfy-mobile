import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth';
import { TruckCheckinService } from './truck-checkin.service';

@Component({
  selector: 'page-truck-checkin',
  templateUrl: 'truck-checkin.html',
  providers: [TruckCheckinService]
})
export class TruckCheckinPage {
  private loading: any;
  public activedCheckin: any;
  public sending: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    public locationAccuracy: LocationAccuracy,
    public toast: ToastController,
    public truckCheckinService: TruckCheckinService) {
      this.loading = this.loadingCtrl.create({content: "Atualizando .."});
  }

  onCheckin(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          (resp) =>{
            this.geolocation.getCurrentPosition().then((resp) => {
              this.sending = true;
              this.truckCheckinService.checkin(resp.coords.latitude,resp.coords.longitude)
              .then(data =>{
                this.getActivedCheckin();
                this.sending = false;
                this.warningForCheckout();
              })
              .catch(error => {
                this.toast.create({message: 'Não consegui atualizar :(',duration: 3000}).present();
              });
            });
          },
          error => console.log('Error requesting location permissions', error));
      }
    });
  }

  onCheckout(){
    this.sending = true;
    this.truckCheckinService.checkout()
    .then(() => {
      this.activedCheckin = null;
      this.sending = false;
    })
    .catch(error => {
      this.toast.create({message: 'Não consegui atualizar :(',duration: 3000}).present();
    });
  }

  warningForCheckout(){
    let alert = this.alertCtrl.create({
      cssClass: "warning-for-checkout",
      message: 'Ao encerrar, não se esqueça de fazer o check-out, para não deixar seus clientes na mão!',
      buttons: ['OK']
    });
    alert.present();
  }

  getActivedCheckin(){
    this.truckCheckinService.getActivedCheckin()
    .then((checkin) => {
      this.activedCheckin = checkin;
    });
  }

  ionViewDidEnter(){
    this.getActivedCheckin();
  }

  ionViewDidLoad() {  }

  ionViewCanEnter(){
    return this.authService.isLoggedIn();
  }
}
