import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
/**
 * Generated class for the RisultatiRicercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risultati-ricerca',
  templateUrl: 'risultati-ricerca.html',
})
export class RisultatiRicercaPage {
posts: any=[];
result:any=[];
  constructor(public dialogs: Dialogs,public navCtrl: NavController, public navParams: NavParams) {
    this.result =navParams.get("ricerca")
    console.log(this.result)
    var elem;
    for(elem of this.result)
      this.posts.push(JSON.parse(elem))
  }

  getCompetenze(competenze){
    var comp = competenze.split(",");
    var msg = "";
    if(comp.length>0){
      for(let entry of comp){
        msg += entry+"\n";
      }
    }
    this.dialogs.alert(msg,"Elenco competenze");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RisultatiRicercaPage');
  }

}
