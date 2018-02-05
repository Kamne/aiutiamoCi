import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';

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

  posts: Array;

  configUrl = 'http://aiutiamoc.altervista.org/getDatiBacheca.php';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs) {

    this.getConfig().map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.posts = data.items;

        /*
        this.posts = [
          {username: data.username, data: data.data, testo: data.testo}
        ];
        */
      }else{
        this.dialogs.alert("Valori errati")
      }
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BachecaPage');
  }



  getConfig() {
    return this.http.get(this.configUrl);
  }
}
