import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ImagePicker } from '@ionic-native/image-picker';
import { CustomFormsModule } from 'ng2-validation'
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Transfer } from '@ionic-native/transfer';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { Intro } from '../pages/intro/intro';
import { AboutPage } from '../pages/about/about';
import { FollowingPage } from '../pages/following/following';
import { FollowingService } from '../pages/following/following.service';
import { SearchPage } from '../pages/search/search';
import { ClientTabsPage } from '../pages/client-tabs/client-tabs';
import { ClientProfilePage } from '../pages/client-profile/client-profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TruckPage } from '../pages/truck/truck';
import { ReviewPage } from '../pages/review/review';
import { AuthService } from '../providers/auth';
import { DishService } from '../providers/dish';
import { TransferService } from '../providers/transfer';
import { TruckService } from '../pages/truck/truck.service';
import { ReviewService } from '../providers/review';

import { TruckTabsPage } from '../pages/truck-tabs/truck-tabs';
import { TruckCheckinPage } from '../pages/truck-checkin/truck-checkin';
import { TruckDishPage } from '../pages/truck-dish/truck-dish';
import { TruckDishDetailPage } from '../pages/truck-dish-detail/truck-dish-detail';
import { TruckSettingPage } from '../pages/truck-setting/truck-setting';

// Raven.config('https://9e4d04850b6a41e2bee90e9f057a9f95@sentry.io/141728').install();
// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err:any) : void {
//     Raven.captureException(err.originalError);
//   }
// }

// class GeolocationMock extends Geolocation {
//   getCurrentPosition(options) {
//     return new Promise((resolve, reject) => {
//       resolve({coords:{latitude:'-18.9374583', longitude:'-48.2862955'}});
//     })
//   }
// }

// class LocationAccuracyMock extends LocationAccuracy {
//   canRequest() {
//     return new Promise((resolve, reject) => {
//       resolve(true);
//     })
//   }
//   request(options) {
//     return new Promise((resolve, reject) => {
//       resolve(true);
//     })
//   }
// }

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd320d2ea'
  }
};

@NgModule({
  declarations: [
    Intro,
    MyApp,
    AboutPage,
    FollowingPage,
    SearchPage,
    LoginPage,
    RegisterPage,
    ClientTabsPage,
    ClientProfilePage,
    TruckPage,
    ReviewPage,

    TruckTabsPage,
    TruckCheckinPage,
    TruckDishPage,
    TruckDishDetailPage,
    TruckSettingPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpModule,
    JsonpModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Intro,
    MyApp,
    AboutPage,
    FollowingPage,
    SearchPage,
    LoginPage,
    RegisterPage,
    ClientTabsPage,
    ClientProfilePage,
    TruckPage,
    ReviewPage,

    TruckTabsPage,
    TruckCheckinPage,
    TruckDishPage,
    TruckDishDetailPage,
    TruckSettingPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler }, 
    LaunchNavigator,
    ImagePicker,
    SplashScreen,
    StatusBar, 
    // { provide: Geolocation, useClass: GeolocationMock },
    // { provide: LocationAccuracy, useClass: LocationAccuracyMock },
    Geolocation ,
    LocationAccuracy,
    Transfer,
    AuthService,
    DishService,
    TruckService,
    TransferService,
    FollowingService,
    ReviewService
  ]
})
export class AppModule {}
