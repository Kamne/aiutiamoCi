import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AnnunciPage} from '../annunci/annunci';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
//import { Http, Headers, RequestOptions } from "@angular/http";
/**
 * Generated class for the ProfiloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public shareService: ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPage');
  }
  /*
  loadPage(p){
    let myTemplate:any;
    results: string[];
  if(p=='annunci')
    {

      });
   //   http.get(AnnunciPage).map((html:any) => this.myTemplate = html);
    }
  }*/
}
