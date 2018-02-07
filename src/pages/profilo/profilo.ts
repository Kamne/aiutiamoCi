import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
import { Events } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from "@angular/http";
/**
 * Generated class for the ProfiloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
    /*
declare var jquery:any;
declare var $ :any;
*/
@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {
/*
  title = 'abgular 4 with jquery';
  toggleTitle(){
    $('.title').slideToggle(); //
  }
*/
  Image:String = "assets/imgs/avatar.png";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events:Events,
              public shareService: ShareService) {
    this.events.subscribe('image', (img) => {
      this.Image = img;
      console.log('Welcome', img);
    });
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

      };
      http.get(AnnunciPage).map((html:any) => this.myTemplate = html);

  }
  */
}
