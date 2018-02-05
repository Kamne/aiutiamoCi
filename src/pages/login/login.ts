import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {HomePage} from '../home/home';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
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

  constructor(public loadingCtrl: LoadingController, public event:Events,public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs,public shareService: ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(username: HTMLInputElement, password: HTMLInputElement): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

loading.present();

  if(username.value === "" || password.value === "")
      console.log("valori errati")
  else{
    var myData = JSON.stringify({username: username.value,password: password.value});
    console.log(myData)
  this.http.post('http://aiutiamoc.altervista.org/login.php',myData).map(res => res.json()).subscribe(   data => {
  console.log(data);
  if(data.success){
    var competenze = data.user.Competenze.split(",")
    console.log(competenze)
    this.shareService.setUser(new Utente(data.user.Nome,data.user.Cognome,data.user.Username,data.user.Immagine,
                                         data.user.Nato,competenze,data.user.TitoloStudio,data.user.CF,
                                         data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                         data.user.Email,data.user.NumTelefono,data.user.Tipologia))
    this.event.publish('image', data.user.Immagine);
    loading.dismiss();
    this.navCtrl.setRoot(HomePage)
  }

  else{
    this.dialogs.alert("Valori errati")
  }
})
  }
}

signup() {
  this.navCtrl.push(SignupPage);
}

}
