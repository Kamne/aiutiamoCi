import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Dialogs } from '@ionic-native/dialogs';
import {ShareService} from '../../providers/shareService';
import { ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

import { HomePage } from '../home/home';
import { RubricaPage } from '../rubrica/rubrica';
import { TabsRicercaPage } from '../tabs-ricerca/tabs-ricerca';
import { BachecaPage } from '../bacheca/bacheca';
import {EventPage} from '../event/event';
import {InserisciPage} from '../inserisci/inserisci';
import {ProfiloPage} from '../profilo/profilo';
import {FaqPage} from "../faq/faq";
import {FaqAdminPage} from "../faq-admin/faq-admin";
import {WelcomePage} from "../welcome/welcome";

import {PasswordDimenticataPage} from '../password-dimenticata/password-dimenticata';
import {RicercaRichiestePage} from '../ricerca-richieste/ricerca';

@IonicPage()
@Component({
  selector: 'page-diventa-assistente',
  templateUrl: 'diventa-assistente.html'
})
export class DiventaAssistentePage {

  myCompetenze:Array<string> =[]
  otherCompetenze:Array<string> =[]
  titStudio:String = "";
  pages:any;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder, public shareService: ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiventaAssistentePage');
    if(this.otherCompetenze.length == 0){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/ricercaUtenti.php',options).subscribe(   data => { //usato per prendere le competenze xD
      console.log(data);
      this.aggiornaPages();


   })

  }
  }

  diventaAssistente() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    var myData = JSON.stringify({
      username: this.shareService.getUser().getUsername(),
      competenze:","+this.myCompetenze.toString()+",,",
      titolo: this.titStudio
     });
     this.http.post('http://aiutiamoc.altervista.org/diventaAssistente.php',myData,options).map(res => res.json()).subscribe(   data => {
      console.log(data.success);
      if(data.success){
          this.navCtrl.setRoot(LoginPage)
      }
      else{
        //this.dialogs.alert(data.message)
      }


    })
     console.log(myData)
  }

  competenze(){

    this.shareService.setMyCompetenze(this.myCompetenze)

    this.shareService.setOtherCompetenze(this.otherCompetenze)
    let obj = {page: true};
    let myModal = this.modalCtrl.create(TabsPage,obj);
    myModal.present();

    myModal.onDidDismiss(data => {

        this.myCompetenze = this.shareService.getMyCompetenze();
        this.otherCompetenze = this.shareService.getOtherCompetenze()


  });
  }

aggiornaPages(){
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

}
