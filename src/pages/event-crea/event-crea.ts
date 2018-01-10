import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";

/**
 * Generated class for the EventCreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-crea',
  templateUrl: 'event-crea.html',
})
export class EventCreaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreaPage');
  }

  creaEvento(img: HTMLInputElement, nome: HTMLInputElement, luogo: HTMLInputElement, date: HTMLInputElement, ora: HTMLInputElement, descrizione: HTMLInputElement, hashtag: HTMLInputElement): void {
      console.log("image:"+img.value)

  /*if(nome.value === "" || password.value === "")
      console.log("valori errati")*/
//  else{
    var myData = JSON.stringify({nome: nome.value,password: luogo.value, img: img.value});
  this.http.post('http://aiutiamoc.altervista.org/login.php',myData).map(res => res.json()).subscribe(   data => {
  console.log(data);})
//  }
}
}
