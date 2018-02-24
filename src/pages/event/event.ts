import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';
import {EventCreaPage} from '../event-crea/event-crea';
import { ShareService } from '../../providers/shareService';
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

  constructor(public shareService: ShareService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public dialogs: Dialogs) {

    this.getConfig().map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.events = data.items;
        //if(data.items.Img)
      }else{
        this.dialogs.alert("Valori errati")
      }
    });


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
