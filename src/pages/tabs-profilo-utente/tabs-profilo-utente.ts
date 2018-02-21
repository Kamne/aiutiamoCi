import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfiloPage} from '../profilo/profilo';
import {ProfiloAnnunciPage} from '../profilo-annunci/profilo-annunci';
import {ProfiloPreferitiPage} from '../profilo-preferiti/profilo-preferiti';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsProfiloUtentePage');
  }

}
