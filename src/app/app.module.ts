import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {WelcomePage} from '../pages/welcome/welcome';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RubricaPage } from '../pages/rubrica/rubrica';
import { RicercaPage } from '../pages/ricerca/ricerca';
import {EventPage} from '../pages/event/event';
import {EventCreaPage} from '../pages/event-crea/event-crea';
import {InserisciPage} from '../pages/inserisci/inserisci';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    MapPage,
    ContactPage,
    HomePage,
    TabsPage,
    RubricaPage,
    RicercaPage,
    EventPage,
    EventCreaPage,
    InserisciPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    GooglePlacesAutocompleteComponentModule,
    IonicModule.forRoot(MyApp,
        {scrollAssist: false,
        autoFocusAssist: false})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RubricaPage,
    RicercaPage,
    MapPage,
    EventPage,
    EventCreaPage,
    InserisciPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpeechRecognition

  ]
})
export class AppModule {}
