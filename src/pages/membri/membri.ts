import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../providers/shareService';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Associazione } from '../../classes/associazione';
import { Utente } from '../../classes/utente';
import { TabsProfiloUtentePage } from '../tabs-profilo-utente/tabs-profilo-utente';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the MembriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membri',
  templateUrl: 'membri.html',
})
export class MembriPage {
membri:any =[]
  constructor(public dialogs: Dialogs,public alertCtrl: AlertController,public events: Events,public http:Http,public shareService: ShareService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if(this.navParams.get("other") == undefined)
      this.membri =this.shareService.getUser().getMembri()
    else
      this.membri =this.shareService.getOtherUser().getMembri()

  }

itemSelected(membro){
  console.log(membro);
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
  let options = new RequestOptions({ headers: headers });
  var myData = JSON.stringify({
    username: membro
  });
  this.http.post('http://aiutiamoc.altervista.org/getUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
    console.log(data);
    if(data.success){
      if(data.user.Tipologia == "associazione"){
        this.shareService.setOtherUser(new Associazione(data.user.Nome,data.user.Username,data.user.Immagine,
                                             data.user.Descrizione,data.user.Fondata,data.user.PartitaIVA,
                                             data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                             data.user.Email,data.user.NumTelefono,data.user.Tipologia,data.membri))
      //  this.event.publish('image', data.user.Immagine);
      }
      else{
      var competenze = data.user.Competenze.split(",")
      while(competenze[competenze.length-1] == "")
        competenze.pop();

      this.shareService.setOtherUser(new Utente(data.user.Nome,data.user.Cognome,data.user.Username,data.user.Immagine,
                                           data.user.Nato,competenze,data.user.TitoloStudio,data.user.CF,
                                           data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                           data.user.Email,data.user.NumTelefono,data.user.Tipologia,data.user.Sesso,data.preferiti))
      console.log(this.shareService.getOtherUser())

    }

     this.profilo();

} //if
})
}

profilo(){
  let obj = {other: true,miracolo:true};
  this.events.publish('otherAss', obj);
}

alert_membro(){
  let alert = this.alertCtrl.create({
    title: 'Preferiti',
    message:'Digitare l\' username dell\'utente da inserire',
    cssClass:"alert",
    inputs: [
      {
        name: 'membro',
        type: 'text',


      }
    ],

    buttons: ['Annulla' ,
    {
      text: 'Conferma',
      handler: data => {
        console.log(data)
        this.insert_membro(data.membro)
      }
    }]
  });
  alert.present();
}

insert_membro(nome){

  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
  let options = new RequestOptions({ headers: headers });
  var myData = JSON.stringify({associazione: this.shareService.getUser().getUsername(),assistente: nome,tel:this.shareService.getUser().getTel()});
  console.log("campania",myData)
  this.http.post('http://aiutiamoc.altervista.org/Insert_Membro.php',myData,options).map(res => res.json()).subscribe(   data => {
    console.log("ciccio",data);
    this.dialogs.alert(""+data.message)
    if(data.message == 'Operazione effettuata con successo')
      this.membri.push(nome)
  })

}

}
