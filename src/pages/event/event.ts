import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.events = [
      {image: 'assets/imgs/eventi/lavoretti-per-disabili.jpg', datestart: '19/01/2018', dateend: '22/01/2018', title: 'Evento Milano',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ',
        location: 'Milano', hashtags: '#eventoMilano'}
    ];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  creaEvento(){
    this.navCtrl.push(EventCreaPage);
  }
}
