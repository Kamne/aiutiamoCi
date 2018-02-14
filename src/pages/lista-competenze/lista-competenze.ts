import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ShareService } from '../../providers/shareService';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lista-competenze',
  templateUrl: 'lista-competenze.html',
})
export class ListaCompetenzePage {
nuovo:string;
show:boolean= this.navParams.get("page")
allCompetenze: Array<string> = this.shareService.getOtherCompetenze() ;
myCompetenze: Array<string> = this.shareService.getMyCompetenze() ;
  constructor(public events: Events,public alertCtrl: AlertController, public shareService: ShareService,public  nativeStorage:NativeStorage,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
console.log("navParams",this.navParams.get("page"))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCompetenzePage');
  }

  closeModal() {
    this.events.publish('closeModal', this.myCompetenze);
    //this.viewCtrl.dismiss(this.myCompetenze);
  }

  selected(name:string){
      var idx = this.allCompetenze.indexOf(name);
      this.allCompetenze.splice(idx, 1);
      this.shareService.setOtherCompetenze(this.allCompetenze);
      this.myCompetenze.push(name);
      this.shareService.setMyCompetenze(this.myCompetenze);
    //  this.shareService.setAllCompetenze(this.allCompetenze);
}

insert_competenza(){
  let alert = this.alertCtrl.create({
    title: 'Nuova competenza',
    message:'Inserire la competenza da aggiungere',
    cssClass:"alert",
    inputs: [
      {
        name: 'comp',
        type: 'text',
        value:this.nuovo,

      }
    ],

    buttons: ['Annulla' ,
    {
      text: 'Conferma',
      handler: data => {
        console.log(data)
          this.allCompetenze.push(data.comp)
            this.shareService.setOtherCompetenze(this.allCompetenze);
      }
    }]
  });
  alert.present();
}
}
