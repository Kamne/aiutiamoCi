import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Dialogs } from '@ionic-native/dialogs';
import {ShareService} from '../../providers/shareService';

/**
 * Generated class for the DiventaAssistentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diventa-assistente',
  templateUrl: 'diventa-assistente.html'
})
export class DiventaAssistentePage {

  utente: ShareService;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder, public user: ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiventaAssistentePage');
  }

  diventaAssistente(competenze: HTMLInputElement, titolo: HTMLInputElement) {
    // prova
    alert(this.utente.getUser().getUsername());

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    var myData = JSON.stringify({
      username: this.utente.getUser().getUsername(),
      competenze: competenze.value,
      titolo: titolo.value
     });
  }

}
