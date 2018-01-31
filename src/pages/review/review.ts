import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ReviewService } from './review.service';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
  providers: [ReviewService]
})
export class ReviewPage {
  private truck:any = {};
  private review:any = {truck:null, rate:5, text:""};
  private loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public reviewService: ReviewService) {
      this.loading = this.loadingCtrl.create({content: "Salvando sua avaliação .."});
    }

  ionViewDidLoad() {
    this.truck = this.navParams.get('truck');
    this.review.truck = this.truck.id;
  }

  onChangeRate(rate:number){
    this.review.rate = rate;
  }

  onMakeReview(reviewForm){
    this.loading.present();
    this.reviewService.makeReview(this.review)
    .then(data =>{
      this.loading.dismiss();
      this.toast.create({message: 'Obrigado pelo seu comentário :)', duration: 3000}).present();
      this.navCtrl.pop();
    });
  }
}
