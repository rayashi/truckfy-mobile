import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { DishService } from '../../providers/dish';
import { AuthService } from '../../providers/auth';
import { TruckDishDetailPage } from '../truck-dish-detail/truck-dish-detail';

@Component({
  selector: 'page-truck-dish',
  templateUrl: 'truck-dish.html'
})
export class TruckDishPage {
  private dishes: any[] = [];
  private loading: any;
  private gettingDishes: boolean = true;
  private noDish = false;
  private TruckDishDetailPage = TruckDishDetailPage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public dishService: DishService,
    public loadingCtrl: LoadingController,
    public authService: AuthService) {
      this.loading = this.loadingCtrl.create({content: "Carregando .."});
  }
  
  ionViewDidEnter(){
    if(this.navCtrl.last().component == this.TruckDishDetailPage){
      this.getDishes();  
    }
  }

  ionViewDidLoad() {
    this.getDishes();
  }

  getDishes(){
    if(this.authService.userAthenticated.userType == 'truck' && this.authService.userAthenticated.truck.id){
      this.gettingDishes = true;
      this.dishService.listDishes(this.authService.userAthenticated.truck.id)
        .then( data => {
          this.dishes = data;
          this.gettingDishes = false;
        },err => {
          console.log('Error while getting dishes');
          this.gettingDishes = false;
        });
    }
  }

  onDishClick(dish){
    this.navCtrl.push(TruckDishDetailPage,{dish:dish});
  }
  ionViewCanEnter(){
    return this.authService.isLoggedIn();
  }
}
