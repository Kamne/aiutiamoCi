import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordDimenticataPage } from '../pages/password-dimenticata/password-dimenticata';


import {WelcomePage} from '../pages/welcome/welcome';
import {MembriPage} from '../pages/membri/membri';
import {ProfiloAnnunciPage} from '../pages/profilo-annunci/profilo-annunci';
import {ProfiloPreferitiPage} from '../pages/profilo-preferiti/profilo-preferiti';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {AnnunciPage} from '../pages/annunci/annunci';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsProfiloUtentePage } from '../pages/tabs-profilo-utente/tabs-profilo-utente';



import { RubricaPage } from '../pages/rubrica/rubrica';
import { RicercaRichiestePage } from '../pages/ricerca-richieste/ricerca';
import { RicercaOffertePage } from '../pages/ricerca-offerte/ricerca-offerte';
import { RicercaEventiPage } from '../pages/ricerca-eventi/ricerca-eventi';
import {EventPage} from '../pages/event/event';
import {EventCreaPage} from '../pages/event-crea/event-crea';
import {InserisciPage} from '../pages/inserisci/inserisci';
import { MapPage } from '../pages/map/map';
import {ProfiloPage} from '../pages/profilo/profilo';
import { BachecaPage } from '../pages/bacheca/bacheca';
import { ListaCompetenzePage } from '../pages/lista-competenze/lista-competenze';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { CompetenzeSelectedPage } from '../pages/competenze-selected/competenze-selected';
import { TabsRicercaPage } from '../pages/tabs-ricerca/tabs-ricerca';

import { StatusBar } from '@ionic-native/status-bar';
import {FaqPage} from "../pages/faq/faq";
import {FaqAdminPage} from "../pages/faq-admin/faq-admin";
import {OpzioniAmministratorePage} from "../pages/opzioni-amministratore/opzioni-amministratore";
import {DiventaAssistentePage} from '../pages/diventa-assistente/diventa-assistente';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Dialogs } from '@ionic-native/dialogs';
import { ShareService } from '../providers/shareService';
import { EmailComposer } from '@ionic-native/email-composer';
import { Utente } from '../classes/utente';
import { Camera } from '@ionic-native/camera'
import { GoogleMaps, Spherical} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import {ProfiloAssociazionePage} from "../pages/profilo-associazione/profilo-associazione";

@NgModule({
  declarations: [
    MyApp,
    ProfiloAssociazionePage,
    AboutPage,
    WelcomePage,
    LoginPage,
    CompetenzeSelectedPage,
    ProfiloPreferitiPage,
    SignupPage,
    ListaCompetenzePage,
    MapPage,
    MembriPage,
    ContactPage,
    TabsProfiloUtentePage,
    HomePage,
    TabsPage,
    RicercaOffertePage,
    RegistrazionePage,
    RubricaPage,
    ProfiloAnnunciPage,
    RicercaRichiestePage,
    RicercaEventiPage,
    TabsRicercaPage,
    EventPage,
    PasswordDimenticataPage,
    AnnunciPage,
    EventCreaPage,
    InserisciPage,
    ProfiloPage,
    BachecaPage,
    FaqAdminPage,
    FaqPage,
    DiventaAssistentePage,
    OpzioniAmministratorePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,
        {scrollAssist: false,
        autoFocusAssist: false})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    AnnunciPage,
    MembriPage,
    SignupPage,
    PasswordDimenticataPage,
    AboutPage,
    ContactPage,
    TabsProfiloUtentePage,
    ProfiloPreferitiPage,
    ProfiloAssociazionePage,
    HomePage,
    TabsRicercaPage,
    ProfiloAnnunciPage,
    RicercaOffertePage,
    CompetenzeSelectedPage,
    RicercaEventiPage,
    TabsPage,
    RegistrazionePage,
    ListaCompetenzePage,
    RubricaPage,
    RicercaRichiestePage,
    MapPage,
    EventPage,
    EventCreaPage,
    InserisciPage,
    ProfiloPage,
    BachecaPage,
    FaqAdminPage,
    FaqPage,
    DiventaAssistentePage,
    OpzioniAmministratorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    NativeStorage,
    Camera,
    Spherical,
    SMS,
    EmailComposer,
    GoogleMaps,
    Geolocation,
    NativeGeocoder,
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpeechRecognition,
    Utente,
    CallNumber
  ]
})
export class AppModule {

}
