//<reference path="../pages/ricerca/ricerca.ts"/>
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { RubricaPage } from '../pages/rubrica/rubrica';
import { TabsRicercaPage } from '../pages/tabs-ricerca/tabs-ricerca';
import { BachecaPage } from '../pages/bacheca/bacheca';
import {EventPage} from '../pages/event/event';
import {InserisciPage} from '../pages/inserisci/inserisci';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {ProfiloPage} from '../pages/profilo/profilo';
import { Events } from 'ionic-angular';
import {FaqPage} from "../pages/faq/faq";
import {FaqAdminPage} from "../pages/faq-admin/faq-admin";

import {DiventaAssistentePage} from '../pages/diventa-assistente/diventa-assistente';
import {PasswordDimenticataPage} from '../pages/password-dimenticata/password-dimenticata';
import {RicercaRichiestePage} from '../pages/ricerca-richieste/ricerca';
import { ShareService } from '../providers/shareService';
import { Utente } from '../classes/utente';



@Component({

  templateUrl: 'app.html'
})
// pagina iniziale
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  Image:String = "../assets/imgs/avatar.png"
  rootPage:any = WelcomePage;


  pages: any;
  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events:Events,
              public shareService: ShareService) {

    this.events.subscribe('image', (img) => {
      this.Image = img;
 // console.log('Welcome', img);
});
    this.initializeApp();
  //  if(this.shareService.getUser() != undefined){
//    if(this.shareService.getUser().getTipologia() == "assistente")
    this.pages = [
      {label:'Home',items:[
                            { title: 'Home', component: HomePage, icon: 'home' },
                            { title: 'Inserisci Annuncio', component: InserisciPage, icon: 'create'  },
                            { title: 'Bacheca', component: BachecaPage, icon: 'paper' },
                         //   { title: 'Rubrica', component: RubricaPage, icon: 'bookmarks' },
                         //   { title: 'Cerca Assistente', component: WelcomePage, icon: 'search' },
                            { title: 'Eventi', component: EventPage, icon: 'people' },
                      ]},
      {label:'utente',items:[
                            { title: 'Profilo', component: ProfiloPage, icon: 'contact' },
                            { title: 'Info - FAQ', component: WelcomePage, icon: 'information-circle' },
                            ]},

      {label:'setting',items:[
                      //      { title: 'Opzioni Amministratore', component: WelcomePage, icon: 'construct' }
                            ]},
        {label:'ricerca',items:[
            { title: 'Ricerca', component: TabsRicercaPage, icon: 'search' }

        ]},

        {label:'',items:[
                          //    { title: 'Login', component: LoginPage, icon: 'log-in' },
                        //      { title: 'Registrati', component: SignupPage, icon: 'log-in' },
                             { title: 'Logout', component: WelcomePage, icon: 'log-out' }
        ]},

    ];
this.shareService.setPages(this.pages)
  }
    initializeApp()
    {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
     //   this.splashScreen.hide();
      });
    }
  openPage(page)
    {

    this.menu.close();

     this.nav.push(page.component);
    }
    openResearch(){
        this.menu.close();
        this.nav.push(TabsRicercaPage);

    }


    setImage(src){
      this.Image = src;
    }

cambiaImg(){
  
}
}
