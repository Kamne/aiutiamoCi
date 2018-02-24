import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';
import {InserisciPage} from '../inserisci/inserisci';
import { CallNumber } from '@ionic-native/call-number';


/**
 * Generated class for the BachecaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bacheca',
  templateUrl: 'bacheca.html',
})
export class BachecaPage {

  posts: any;
  configUrl = 'http://aiutiamoc.altervista.org/getDatiBacheca.php';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public dialogs: Dialogs,
              private callNumber: CallNumber) {

    this.getConfig().map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.posts = data.items;
      }else{
        this.dialogs.alert("Valori errati")
      }
    });
  }

  nuovo_msg(){
    this.navCtrl.push(InserisciPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BachecaPage');
  }

  getCompetenze(competenze){
    var comp = competenze.split(",");
    var msg = "";
    if(comp.length>0){
      for(let entry of comp){
        msg += entry+"\n";
      }
    }
    this.dialogs.alert(msg,"Elenco competenze");
  }

  callNumTelephone(n: string){
    this.callNumber.callNumber(n, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }
  getConfig() {
    return this.http.get(this.configUrl);
  }


}
