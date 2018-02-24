
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegistrazionePage} from '../registrazione/registrazione';
import { Associazione } from '../../classes/associazione';
import { Dialogs } from '@ionic-native/dialogs';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Events } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { RubricaPage } from '../rubrica/rubrica';
import { TabsRicercaPage } from '../tabs-ricerca/tabs-ricerca';
import { TabsProfiloUtentePage } from '../tabs-profilo-utente/tabs-profilo-utente';
import { BachecaPage } from '../bacheca/bacheca';
import { MembriPage } from '../membri/membri';
import {EventPage} from '../event/event';
import {InserisciPage} from '../inserisci/inserisci';
import {ProfiloPage} from '../profilo/profilo';
import {FaqPage} from "../faq/faq";
import {FaqAdminPage} from "../faq-admin/faq-admin";

import {DiventaAssistentePage} from '../diventa-assistente/diventa-assistente';
import {PasswordDimenticataPage} from '../password-dimenticata/password-dimenticata';
import {RicercaRichiestePage} from '../ricerca-richieste/ricerca';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
membri:Array<string> = []
  constructor(public event:Events,public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs,public shareService: ShareService) {
  }
    pages: any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(username: HTMLInputElement, password: HTMLInputElement): void {


  if(username.value === "" || password.value === "")
      console.log("valori errati")
  else{
    var myData = JSON.stringify({username: username.value,password: password.value});
  this.http.post('http://aiutiamoc.altervista.org/login.php',myData).map(res => res.json()).subscribe(   data => {
  console.log(data);
  if(data.success){
    if(data.user.Tipologia == "associazione"){
      this.membri = data.membri
      this.shareService.setUser(new Associazione(data.user.Nome,data.user.Username,data.user.Immagine,
                                           data.user.Descrizione,data.user.Fondata,data.user.PartitaIVA,
                                           data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                           data.user.Email,data.user.NumTelefono,data.user.Tipologia,this.membri))
      this.event.publish('image', data.user.Immagine);
    }
    else{
    var competenze = data.user.Competenze.split(",")
    while(competenze[competenze.length-1] == "")
      competenze.pop();

    this.shareService.setUser(new Utente(data.user.Nome,data.user.Cognome,data.user.Username,data.user.Immagine,
                                         data.user.Nato,competenze,data.user.TitoloStudio,data.user.CF,
                                         data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                         data.user.Email,data.user.NumTelefono,data.user.Tipologia,data.user.Sesso,data.preferiti))
    this.event.publish('image', data.user.Immagine);}
    this.aggiornaPages(this.shareService.getUser().getTipologia())
    this.navCtrl.setRoot(HomePage)
    console.log(this.shareService.getUser())

  }

  else{
    this.dialogs.alert("Valori errati")
  }
})


  }
}

signup() {
  this.navCtrl.push(RegistrazionePage);
}

pass(){
  console.log("salve")
    this.navCtrl.push(PasswordDimenticataPage);
}


aggiornaPages(tipologia){
  if(tipologia == "assistente"){
    console.log("sto ancora qua",tipologia)
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
                            { title: 'Profilo', component: TabsProfiloUtentePage, icon: 'contact' },
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
  }


  if(tipologia == "utente"){
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
                            { title: 'Profilo', component: TabsProfiloUtentePage, icon: 'contact' },
                            { title: 'Info - FAQ', component: WelcomePage, icon: 'information-circle' },
                            ]},

      {label:'setting',items:[
                            { title: 'Diventa assistente', component: DiventaAssistentePage, icon: 'construct' }
                            ]},

        {label:'ricerca',items:[
            { title: 'Ricerca', component: TabsRicercaPage, icon: 'search' }

        ]},

        {label:'',items:[
                        //      { title: 'Login', component: LoginPage, icon: 'log-in' },
                        //      { title: 'Registrati', component: SignupPage, icon: 'log-in' },
                              { title: 'Logout', component: WelcomePage, icon: 'log-out' }
        ]},
    ];
  }


  if(tipologia == "amministratore"){
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
                            { title: 'Profilo', component: TabsProfiloUtentePage, icon: 'contact' },
                            { title: 'Info - FAQ', component: WelcomePage, icon: 'information-circle' },
                            ]},

      {label:'setting',items:[
                            { title: 'Opzioni Amministratore', component: WelcomePage, icon: 'construct' }
                            ]},

        {label:'ricerca',items:[
            { title: 'Ricerca', component: TabsRicercaPage, icon: 'search' }

        ]},

        {label:'',items:[
                        //      { title: 'Login', component: LoginPage, icon: 'log-in' },
                        //      { title: 'Registrati', component: SignupPage, icon: 'log-in' },
                              { title: 'Logout', component: WelcomePage, icon: 'log-out' }
        ]},

    ];
  }
  if(tipologia == "associazione"){
    this.pages = [
      {label:'Home',items:[
                            { title: 'Home', component: HomePage, icon: 'home' },
                          //  { title: 'Inserisci Annuncio', component: InserisciPage, icon: 'create'  },
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
                            { title: 'Membri', component: MembriPage, icon: 'construct' }
                            ]},

        {label:'ricerca',items:[
            { title: 'Ricerca', component: TabsRicercaPage, icon: 'search' }

        ]},

        {label:'',items:[
                        //      { title: 'Login', component: LoginPage, icon: 'log-in' },
                        //      { title: 'Registrati', component: SignupPage, icon: 'log-in' },
                              { title: 'Logout', component: WelcomePage, icon: 'log-out' }
        ]},

    ];
  }

this.shareService.setPages(this.pages)
}

}
