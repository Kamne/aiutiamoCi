import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegistrazionePage} from '../registrazione/registrazione';
import {HomePage} from '../home/home';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
import { Associazione } from '../../classes/associazione';
import { Dialogs } from '@ionic-native/dialogs';

import { Http, Headers, RequestOptions } from "@angular/http";
import { Events } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public event:Events,public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs,public shareService: ShareService) {
  }

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
      this.shareService.setUser(new Associazione(data.user.Nome,data.user.Username,data.user.Immagine,
                                           data.user.Descrizione,data.user.Fondata,data.user.PartitaIVA,
                                           data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                           data.user.Email,data.user.NumTelefono,data.user.Tipologia))
      this.event.publish('image', data.user.Immagine);
    }
    else{
    var competenze = data.user.Competenze.split(",")

    this.shareService.setUser(new Utente(data.user.Nome,data.user.Cognome,data.user.Username,data.user.Immagine,
                                         data.user.Nato,competenze,data.user.TitoloStudio,data.user.CF,
                                         data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                         data.user.Email,data.user.NumTelefono,data.user.Tipologia))
    this.event.publish('image', data.user.Immagine);}
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

}
