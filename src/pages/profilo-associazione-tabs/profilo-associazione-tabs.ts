import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {MembriPage} from '../membri/membri';
import {ProfiloAssociazioneEventiPage} from "../profilo-associazione-eventi/profilo-associazione-eventi";
import {TabsProfiloUtentePage} from '../tabs-profilo-utente/tabs-profilo-utente';
import {ProfiloAssociazionePage} from "../profilo-associazione/profilo-associazione";

/**
 * Generated class for the ProfiloAssociazioneTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo-associazione-tabs',
  templateUrl: 'profilo-associazione-tabs.html',
})
export class ProfiloAssociazioneTabsPage {
  tab1Root = ProfiloAssociazionePage;
  tab2Root = MembriPage;
    tab3Root = ProfiloAssociazioneEventiPage;
  constructor(public events: Events,public navCtrl: NavController, public navParams: NavParams) {
    events.subscribe('otherAss', (obj) => {
      console.log("ciccio")
  if(obj.miracolo)
  this.navCtrl.push(TabsProfiloUtentePage,obj);
  obj.miracolo = false
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloAssociazioneTabsPage');
  }

}
