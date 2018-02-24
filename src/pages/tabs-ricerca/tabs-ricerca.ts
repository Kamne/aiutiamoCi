import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListaCompetenzePage } from '../lista-competenze/lista-competenze';
import { CompetenzeSelectedPage } from '../competenze-selected/competenze-selected';
import { RicercaRichiestePage } from '../ricerca-richieste/ricerca';
import { RicercaOffertePage } from '../ricerca-offerte/ricerca-offerte';
import { RicercaEventiPage } from '../ricerca-eventi/ricerca-eventi';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { RisultatiRicercaPage } from '../risultati-ricerca/risultati-ricerca';

/**
 * Generated class for the TabsRicercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-ricerca',
  templateUrl: 'tabs-ricerca.html',
})
export class TabsRicercaPage {

  params:any;
  tab1Root = RicercaRichiestePage;
  tab2Root = RicercaOffertePage;
    tab3Root = RicercaEventiPage;

  constructor(public navCtrl: NavController,public events: Events,public navParams: NavParams,public viewCtrl: ViewController) {
    events.subscribe('risRicerca', (obj) => {
      console.log(obj)
  if(obj.miracolo)
  this.navCtrl.push(RisultatiRicercaPage,{ricerca: obj.ris})
  obj.miracolo = false
    });

  }
}
