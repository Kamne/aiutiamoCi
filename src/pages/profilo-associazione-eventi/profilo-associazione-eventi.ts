import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';
import {EventCreaPage} from '../event-crea/event-crea';
import { ShareService } from '../../providers/shareService';

@IonicPage()
@Component({
  selector: 'page-profilo-associazione-eventi',
  templateUrl: 'profilo-associazione-eventi.html',
})
export class ProfiloAssociazioneEventiPage {
  events:any;

  constructor(public navCtrl: NavController,public navParams: NavParams,public http: Http, public dialogs: Dialogs,public shareService: ShareService) {
    console.log("username",this.shareService.getUser().getUsername());
    var myData = JSON.stringify({username: this.shareService.getUser().getUsername()});
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/eventiAssociazione.php',myData,options).map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.events = data.items;
      }else{
        this.dialogs.alert("Valori errati")
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  creaEvento(){
    this.navCtrl.push(EventCreaPage);
  }
}
