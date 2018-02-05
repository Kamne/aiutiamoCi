import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RicercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ricerca',
  templateUrl: 'ricerca.html',
})
export class RicercaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RicercaPage');
  }

  onChange(v){
    if(v=="richieste"){
      document.getElementById("richieste").style.display="block";
    }else{
      document.getElementById("richieste").style.display="none";
    }
    if(v=="assistenti"){
      document.getElementById("assistenti").style.display="block";
    }else{
      document.getElementById("assistenti").style.display="none";
    }
    if(v=="eventi"){
      document.getElementById("eventi").style.display="block";
    }else{
      document.getElementById("eventi").style.display="none";
    }
  }

}
