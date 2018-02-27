import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ShareService } from '../../providers/shareService';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';


@IonicPage()
@Component({
  selector: 'page-lista-competenze',
  templateUrl: 'lista-competenze.html',
})
export class ListaCompetenzePage {
nuovo:string;
show:boolean= this.navParams.get("page")
visible:boolean= this.navParams.get("visible");
newCompetenze:Array<string> = []
allCompetenze: Array<string> = this.shareService.getOtherCompetenze() ;
myCompetenze: Array<string> = this.shareService.getMyCompetenze() ;
  constructor(public dialogs:Dialogs,public events: Events,public alertCtrl: AlertController, public shareService: ShareService,public  nativeStorage:NativeStorage,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
console.log("navParams",this.navParams.get("page"))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCompetenzePage');
    console.log("visible",this.visible)
  }

  closeModal() {
    if(this.visible == undefined)
      this.events.publish('closeModal', this.myCompetenze);
    else
      this.viewCtrl.dismiss(this.myCompetenze);
  }

  selected(name:string){
      if(this.visible == undefined){
      var idx = this.allCompetenze.indexOf(name);
      this.allCompetenze.splice(idx, 1);
      this.shareService.setOtherCompetenze(this.allCompetenze);
      this.myCompetenze.push(name);
      this.shareService.setMyCompetenze(this.myCompetenze);}

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
        if(this.shareService.getOtherCompetenze().indexOf(data.comp) < 0 && this.shareService.getMyCompetenze().indexOf(data.comp) < 0){
          this.allCompetenze.push(data.comp)
          this.newCompetenze.push(data.comp)
          this.shareService.setNewCompetenze(this.newCompetenze)
            this.shareService.setOtherCompetenze(this.allCompetenze);
        }
        else
          this.dialogs.alert("Competenza giá presente nella lista")

      }//handler
    }]
  });
  alert.present();
}
}
