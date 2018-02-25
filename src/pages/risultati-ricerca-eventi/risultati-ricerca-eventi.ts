import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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
  posts:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber) {
    this.posts = navParams.get("risultati")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RisultatiRicercaEventiPage');
  }

  callNumTelephone(n: string){
    this.callNumber.callNumber(n, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }

}
