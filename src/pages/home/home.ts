import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InserisciPage} from '../inserisci/inserisci';
import { ShareService } from '../../providers/shareService';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService ) {
  }

  ionViewDidLoad() {
<<<<<<< HEAD
    console.log(this.shareService.getUser().getUsername());

  }
insert(){
  this.navCtrl.setRoot(InserisciPage)
}
=======
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
>>>>>>> 2b5bb461cdff8fdb2f1540e4cb6b87eb59f90e74
}
