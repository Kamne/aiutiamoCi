import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RicercaPage} from '../ricerca/ricerca';
import {RubricaPage} from '../rubrica/rubrica';
import {BachecaPage} from '../bacheca/bacheca';
import {EventPage} from '../event/event';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  cerca(){
    this.navCtrl.push(RicercaPage);
  }
  bacheca(){
    this.navCtrl.push(BachecaPage);
  }
  eventi(){
    this.navCtrl.push(EventPage);
  }
  rubrica(){
    this.navCtrl.push(RubricaPage);
  }
}
