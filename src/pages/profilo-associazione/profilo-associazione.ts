import { Component } from '@angular/core';

import {EventPage} from '../event/event';

import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {AnnunciPage} from '../annunci/annunci';
import {ListaCompetenzePage} from '../lista-competenze/lista-competenze';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { MembriPage } from '../membri/membri';

/**
 * Generated class for the ProfiloAssociazionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo-associazione',
  templateUrl: 'profilo-associazione.html',
})
export class ProfiloAssociazionePage {

  Image:String = "assets/imgs/avatar.png";
  showAssociazione:boolean = false;
 
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events:Events,
              public shareService: ShareService,
              public modalCtrl: ModalController) {

                
    if(this.shareService.getUser().getTipologia() == "associazione")
    this.showAssociazione = true;
    if(navParams.get('other')){
      if(this.shareService.getOtherUser().getTipologia() == "associazione")
        this.showAssociazione = true;
      else
        this.showAssociazione = false;
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

}
