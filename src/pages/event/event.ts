import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';
import {EventCreaPage} from '../event-crea/event-crea';
/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  events:any;
  configUrl = 'http://aiutiamoc.altervista.org/getDatiEventi.php';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public dialogs: Dialogs) {

    this.getConfig().map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.events = data.items;
      }else{
        this.dialogs.alert("Valori errati")
      }
    });
    /*
    this.events = [
      {image: 'assets/imgs/eventi/lavoretti-per-disabili.jpg', datestart: '19/01/2018', dateend: '22/01/2018', title: 'Evento Milano',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ',
        location: 'Milano', hashtags: '#eventoMilano'}
    ];
    */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }

  creaEvento(){
    this.navCtrl.push(EventCreaPage);
  }
}
