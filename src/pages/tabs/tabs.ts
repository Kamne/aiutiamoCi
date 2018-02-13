import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListaCompetenzePage } from '../lista-competenze/lista-competenze';
import { CompetenzeSelectedPage } from '../competenze-selected/competenze-selected';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //@ViewChild('myTabs') tabRef: Tabs;
  params:any;
  tab1Root = ListaCompetenzePage;
  tab2Root = CompetenzeSelectedPage;

  constructor(public navParams: NavParams) {
  //  this.params = params;
 // returns NavParams {data: Object}


 // this tells the tabs component which Pages should be each tab's root Page

  }
  aiuto(){
    this.params = { id: 42 };
  }
}
