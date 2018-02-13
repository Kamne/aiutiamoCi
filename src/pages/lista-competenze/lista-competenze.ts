import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ShareService } from '../../providers/shareService';

@IonicPage()
@Component({
  selector: 'page-lista-competenze',
  templateUrl: 'lista-competenze.html',
})
export class ListaCompetenzePage {
comp: Array<boolean> = [];
allCompetenze: Array<string> = this.shareService.getAllCompetenze() ;
myCompetenze: Array<string> = this.shareService.getMyCompetenze() ;
  constructor(public shareService: ShareService,public  nativeStorage:NativeStorage,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log("compSelected",this.myCompetenze)
    console.log("competenze",this.allCompetenze)
    console.log(navParams.get("id"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCompetenzePage');
  }

  closeModal() {
    this.viewCtrl.dismiss(this.myCompetenze);
  }

  selected(name:string){
      var idx = this.allCompetenze.indexOf(name);
      this.allCompetenze.splice(idx, 1);
      this.shareService.setAllCompetenze(this.allCompetenze);
      this.myCompetenze.push(name);
      this.shareService.setMyCompetenze(this.myCompetenze);
    //  this.shareService.setAllCompetenze(this.allCompetenze);
}
}
