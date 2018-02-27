import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListaCompetenzePage } from '../lista-competenze/lista-competenze';
import { CompetenzeSelectedPage } from '../competenze-selected/competenze-selected';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  params:any;
  tab1Root = ListaCompetenzePage;
  tab2Root = CompetenzeSelectedPage;

  constructor(public events: Events,public navParams: NavParams,public viewCtrl: ViewController) {
    events.subscribe('closeModal', (competenze) => {

      this.viewCtrl.dismiss(competenze);
    });

  }

}
