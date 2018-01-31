import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AuthService } from '../../providers/auth';
import { SearchPage } from '../search/search';
import { ClientProfilePage } from '../client-profile/client-profile';
import { RegisterPage } from '../register/register';
import { TruckTabsPage } from '../truck-tabs/truck-tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private login: {username?: string, password?: string} = {};
  private loading: any;
  private registerPage = RegisterPage;
  private userType: any;

  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    private app: App
    ) {
      this.authService.getUserType()
      .then((userType) =>{
        this.userType = userType;
      });
      this.loading = this.loadingCtrl.create({content: "Entrando .."});
    }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.loading.present();
      this.authService.login(this.login.username, this.login.password)
        .then(data => {
          console.log('login correto = '+data);
          this.loading.dismiss();
          this.authService.getUserType()
          .then(userType=>{
            if(userType == 'client'){
              this.app.getRootNav().pop();
            }else{
              this.navCtrl.push(TruckTabsPage);
            }
          });
        })
        .catch(error => {
          console.log(error);
          this.loading.dismiss();
          this.toast.create({message: 'Parece que sua senha não está correta', duration: 3000}).present()
        });
    }
  }

  onCancel(){
    this.app.getRootNav().pop();
  }
}
