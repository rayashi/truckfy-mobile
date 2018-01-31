import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { AuthService } from '../../providers/auth';
import { TransferService } from '../../providers/transfer';
import { Intro } from '../intro/intro';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-truck-setting',
  templateUrl: 'truck-setting.html'
})
export class TruckSettingPage {
  private loading: any;
  private session: any = { userType:null,truck:{} };
  private imageOptions: any = { maximumImagesCount:1,width:500,height:500};
  public utils = Utils;
  public saving = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public imagePicker: ImagePicker,
    public loadingCtrl: LoadingController,
    public transferService: TransferService,
    public toast: ToastController,
    private app: App) {
      this.loading = this.loadingCtrl.create({content: "Saindo .."});
    }

  onUpdateLogo(){
    this.imagePicker.getPictures(this.imageOptions).then((results) => {
      if(results.length>0){
        this.saving = true;
        this.transferService.uploadTruckLogo(results[0])
        .then((data) => {
          this.session.truck.avatar = JSON.parse(data.response).avatar;
          this.authService.userAthenticated.truck.avatar = this.session.truck.avatar;
          this.saving = false;
        }, (err) => {
          console.log("ERRO upload: "+err);
        });
      }      
    }, (err) => {
      console.log(err);
    });    
  }
  
  isRegisterValid(form: NgForm){
    this.session.truck.phone = Utils.unMaskPhone(this.session.truck.phone);
    if(!form.valid || !this.session.truck.phone){
      return false;
    }
    if(this.session.truck.phone.length < 10){
      this.toast.create({message: 'Informe um telefone válido', duration: 2000}).present();
      return false;
    }
    return true;
  }

  onSave(form: NgForm){
    if (this.isRegisterValid(form)) {
      this.saving = true;
      this.authService.truckUdate(this.session.truck)
      .then((data)=>{
        this.session = this.authService.userAthenticated;
        this.session.truck.phone = Utils.unMaskPhone(this.session.truck.phone);
        this.saving = false;
      })
      .catch((error)=>{
        if(error.json().error == 'USED_EMAIL'){
          this.toast.create({message: 'Email já esta em uso', duration: 2000}).present();
        }
        this.saving = false;
      });
    }
  }

  ionViewDidLoad() {
    this.session = this.authService.userAthenticated;
    this.session.truck.phone = Utils.unMaskPhone(this.session.truck.phone);
  }

  onLogout(){
    this.loading.present();
    this.authService.logout()
    .then(()=>{
      this.loading.dismiss();
      this.app.getRootNav().setRoot(Intro);
    });
  }

  ionViewCanEnter(){
    return this.authService.isLoggedIn();
  }

}
