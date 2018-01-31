import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { DishService } from '../../providers/dish';
import { Utils } from '../../providers/utils';
import { AuthService } from '../../providers/auth';
import { TruckDishPage } from '../truck-dish/truck-dish';

@Component({
  selector: 'page-truck-dish-detail',
  templateUrl: 'truck-dish-detail.html'
})
export class TruckDishDetailPage {
  private dish: any;
  private loading: any;

  private mask = createNumberMask({
    prefix: 'R$ ',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toast: ToastController,    
    public authService: AuthService,
    public dishService: DishService) {
    this.dish = navParams.get('dish') || {truck:this.authService.userAthenticated.truck.id};
    this.dish.maskedPrice = Utils.maskMoney(this.dish.price);
    this.loading = this.loadingCtrl.create({content: "Salvando .."});
  }

  ionViewDidLoad() {
  }

  onSave(dishForm){
    if(dishForm.valid){
      this.loading.present();
      if(this.dish.id){
        this.dishService.updateDish(this.dish)
        .then(data => {
          this.toast.create({message: 'Salvo', duration: 3000}).present();
          this.loading.dismiss();
          this.navCtrl.pop();
        });
      }else{
        this.dishService.addDish(this.dish)
        .then(data => {
          this.toast.create({message: 'Prato cadastrado', duration: 3000}).present();
          this.loading.dismiss();
          this.navCtrl.pop();
        });
      }
    }
  }

  onDelete(){
    if(this.dish.id){
      this.loading.present();
      this.dishService.deleteDish(this.dish)
      .then(data => {
        this.toast.create({message: 'Prato eliminado', duration: 3000}).present();
        this.loading.dismiss();
        this.navCtrl.pop();
      });
    }
  }

}
