import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { DishService } from '../../providers/dish';
import { ReviewService } from '../../providers/review';
import { AuthService } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { TruckService } from './truck.service';
import { ReviewPage } from '../review/review';

@Component({
  selector: 'page-truck',
  templateUrl: 'truck.html'
})
export class TruckPage {
  private truck:any;
  private segment:any = 'dishes';
  private dishes: any[] = [];
  private reviews: any[] = [];
  private gettingDishes: boolean = true;
  private loading: any;
  private gettingFollow: boolean = true;
  private gettingReviews: boolean = false;
  private reviewPage = ReviewPage;
  private page = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public dishService: DishService,
    public reviewService: ReviewService,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public truckService: TruckService,
    public alertCtrl: AlertController,
    private launchNavigator: LaunchNavigator
    ) {
    this.loading = this.loadingCtrl.create({content: "Carregando .."});
    this.truck = navParams.get('truck');
  }

  ionViewDidEnter(){

  }

  ionViewDidLoad() {
    this.dishService.listDishes(this.truck.id)
      .then( data => {
        this.dishes = data;
        this.gettingDishes = false;
      },err => {
        console.log('Error while getting dishes');
      });
    
    if(this.authService.isLoggedIn()){
      this.truckService.isFollowing(this.truck.id)
      .then(data => {
        this.truck.is_following = data.is_following;
        this.gettingFollow = false;
      });
    }
  }

  onDirections(){
    let coord: string = this.truck.latitude+','+this.truck.longitude;
    this.launchNavigator.navigate(coord)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
  
  ontToggleFavorite(){
    if(!this.authService.isLoggedIn()){
      this.toast.create({message: 'Faça o login para ter seus favoritos :)', duration: 3000}).present();
      this.navCtrl.push(LoginPage);
    }else{
      if(!this.truck.is_following){
        this.truckService.follow(this.truck.id)
        .then(data => this.truck.is_following = data.following);
      }else{
        this.truckService.unfollow(this.truck.id)
        .then(data => this.truck.is_following = data.following);
      }
    }
  }

  selectedDishes(){
    console.log('dishes tab');
  }
  selectedReviews(){
    this.page = 1;
    this.reviews = [];
    this.getReviews(this.page, null);
  }
  selectedInfos(){
    console.log('Infos tab');
  }
  onReview(){
    if(this.authService.isLoggedIn()){
      this.navCtrl.push(ReviewPage,{'truck':this.truck});
    }else{
      this.navCtrl.push(LoginPage);
    }
  }

  getReviews(page:number, infiniteScroll){
    if(!infiniteScroll)
      this.gettingReviews = true;
    this.reviewService.listReviews(this.truck.id, page)
    .then(data =>{
      this.reviews = this.reviews.concat(data.results);
      this.gettingReviews = false;
      if(infiniteScroll)
        infiniteScroll.complete();
      if(data.next){
        this.page = parseInt(data.next.split("page=")[1]);
      }else{
        this.page = null;
      }
    });
  }

  doInfinite(infiniteScroll) {
    if(this.page){
        this.getReviews(this.page, infiniteScroll);
    }else{
      infiniteScroll.complete();
    }
  }

  onDishClick(dish){
    let alert = this.alertCtrl.create({
      title: dish.name,
      message: dish.text,
      buttons: ['OK']
    });
    alert.present();
  }

}
