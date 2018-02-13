import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../providers/shareService';
/**
 * Generated class for the CompetenzeSelectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competenze-selected',
  templateUrl: 'competenze-selected.html',
})
export class CompetenzeSelectedPage {

  comp: Array<boolean> = [];
  allCompetenze: Array<string> = this.shareService.getAllCompetenze() ;
  myCompetenze: Array<string> = this.shareService.getMyCompetenze() ;


  constructor(public shareService: ShareService,public navCtrl: NavController, public navParams: NavParams) {
    console.log("compSelected",this.myCompetenze)
    console.log("competenze",this.allCompetenze)
    console.log(navParams.get("id"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetenzeSelectedPage');
  }

  selected(name:string){
      var idx = this.myCompetenze.indexOf(name);
      this.myCompetenze.splice(idx, 1);
      this.shareService.setMyCompetenze(this.myCompetenze);
      this.allCompetenze.push(name);
      this.shareService.setAllCompetenze(this.allCompetenze);
    //  this.shareService.setAllCompetenze(this.allCompetenze);
}

}
