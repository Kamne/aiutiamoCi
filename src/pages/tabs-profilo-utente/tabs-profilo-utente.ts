import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfiloPage} from '../profilo/profilo';
import {ProfiloAnnunciPage} from '../profilo-annunci/profilo-annunci';
import {ProfiloPreferitiPage} from '../profilo-preferiti/profilo-preferiti';
import { Events } from 'ionic-angular';

/**
 * Generated class for the TabsProfiloUtentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-profilo-utente',
  templateUrl: 'tabs-profilo-utente.html',
})
export class TabsProfiloUtentePage {
  tab1Root = ProfiloPage;
  tab2Root = ProfiloAnnunciPage;
    tab3Root = ProfiloPreferitiPage;
  constructor(public events: Events,public navCtrl: NavController, public navParams: NavParams) {
    events.subscribe('other', (obj) => {
      console.log("ciccio")
  if(obj.miracolo)
  this.navCtrl.push(TabsProfiloUtentePage,obj);
  obj.miracolo = false
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsProfiloUtentePage');
  }

}
