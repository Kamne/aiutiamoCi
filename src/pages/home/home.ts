import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InserisciPage} from '../inserisci/inserisci';
import { ShareService } from '../../providers/shareService';

import {TabsRicercaPage} from '../tabs-ricerca/tabs-ricerca';
import {RubricaPage} from '../rubrica/rubrica';
import {BachecaPage} from '../bacheca/bacheca';
import {EventPage} from '../event/event';
/**
 * Generated class for the HomePage page.
 *
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService ) {
  }
/*
  ionViewDidLoad() {

    console.log(this.shareService.getUser().getUsername());

  }
  */
insert(){
  this.navCtrl.push(InserisciPage);
}

  cerca(){
    this.navCtrl.push(TabsRicercaPage);
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
