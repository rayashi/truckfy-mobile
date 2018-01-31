import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AuthService } from '../../providers/auth';
import { ClientTabsPage } from '../client-tabs/client-tabs';
import { TruckTabsPage } from '../truck-tabs/truck-tabs';
import { LoginPage } from '../login/login';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private register: {name?: string, email?: string, password?: string, phone?: string} = {};
  private userType: any = null;
  private loading: any;
  private loadingWait: any;
  private LoginPage = LoginPage;
  public mask = ['(',/[1-9]/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    private app: App
    ) {
      this.loading = this.loadingCtrl.create({content: "Cadastrando .."});
      this.authService.getUserType().then((userType)=>this.userType=userType);
    }

  ionViewDidLoad() {
    this.authService.getUserType()
    .then((userType)=>{
      this.userType = userType;
    }).catch(error => {
      console.log(error);
    });
  }

  onToogleUserType(){
    if(this.userType == 'client'){
      this.authService.setUserType('truck');
      this.userType = 'truck';
    }else{
      this.authService.setUserType('client');
      this.userType = 'client';
    }
    
  }

  isRegisterValid(form: NgForm){
    if(this.userType == 'truck'){
      this.register.phone = Utils.unMaskPhone(this.register.phone);
    }    
    if(!form.valid || !this.userType){
      return false;
    }
    if(this.userType == 'truck' && ( this.register.phone.length < 10 || !this.register.phone)) {
      this.toast.create({message: 'Informe um telefone válido', duration: 2000}).present();
      return false;
    }
    return true;
  }

  onRegister(form: NgForm){
    if (this.isRegisterValid(form)) {
      if(this.userType == 'client'){
        this.authService.clientRegister(this.register)
        .then(data => {
          this.loading.dismiss();
          this.app.getRootNav().setRoot(ClientTabsPage);
        })
        .catch(error => {
          this.loading.dismiss();
          this.toast.create({message: 'Parece que esse email já está em uso', duration: 3000}).present();
        });
      }else if(this.userType == 'truck'){
        this.authService.truckRegister(this.register)
        .then(data => {
          this.loading.dismiss();
          this.app.getRootNav().setRoot(TruckTabsPage);
        })
        .catch(error => {
          this.loading.dismiss();
          this.toast.create({message: 'Parece que esse email já está em uso', duration: 3000}).present();
        });
      }
    }
  }
}
