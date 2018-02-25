import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RisultatiRicercaEventiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risultati-ricerca-eventi',
  templateUrl: 'risultati-ricerca-eventi.html',
})
export class RisultatiRicercaEventiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RisultatiRicercaEventiPage');
  }

}
