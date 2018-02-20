import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {AnnunciPage} from '../annunci/annunci';
import {ListaCompetenzePage} from '../lista-competenze/lista-competenze';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {

  Image:String = "assets/imgs/avatar.png";
  showAssistente:boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events:Events,
              public shareService: ShareService,
              public modalCtrl: ModalController) {
    if(this.shareService.getUser().getTipologia() == "assistente")
    this.showAssistente = true;
    if(navParams.get('other')){
      if(this.shareService.getOtherUser().getTipologia() == "assistente")
        this.showAssistente = true;
      else
        this.showAssistente = false;
    }
    console.log('Welcome',navParams.get('other'));
    if(navParams.get('other') != undefined){
      console.log("sto qua")
      this.Image =  shareService.getOtherUser().getImg();
    }
    else
        this.Image =  shareService.getUser().getImg();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPage');
  }

  competenze(){
    if(this.navParams.get('other'))
    this.shareService.setOtherCompetenze(this.shareService.getOtherUser().getCompetenze())
    else
    this.shareService.setOtherCompetenze(this.shareService.getUser().getCompetenze())
    let obj = {page: false,visible: true};
    let myModal = this.modalCtrl.create(ListaCompetenzePage,obj);
    myModal.present();

  }

}
