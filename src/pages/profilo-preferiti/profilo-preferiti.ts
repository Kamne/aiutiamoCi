import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { ShareService } from '../../providers/shareService';
import { Associazione } from '../../classes/associazione';
import { Utente } from '../../classes/utente';
import { TabsProfiloUtentePage } from '../tabs-profilo-utente/tabs-profilo-utente';
import { Dialogs } from '@ionic-native/dialogs';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the ProfiloPreferitiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo-preferiti',
  templateUrl: 'profilo-preferiti.html',
})
export class ProfiloPreferitiPage {
nuovo:string='';
preferiti:Array<string> =[];

  constructor(public events: Events,public alertCtrl: AlertController,public dialogs: Dialogs,public shareService: ShareService, public navCtrl: NavController, public navParams: NavParams,public http:Http) {

   if(navParams.get('other') != undefined)
   this.preferiti = this.shareService.getOtherUser().getPreferiti()
   else
   this.preferiti = this.shareService.getUser().getPreferiti()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPreferitiPage');
  }

getInfo(username){
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
  let options = new RequestOptions({ headers: headers });
  var myData = JSON.stringify({
    username: username
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
      competenze.shift()
      while(competenze[competenze.length-1] == "")
        competenze.pop();

      this.shareService.setOtherUser(new Utente(data.user.Nome,data.user.Cognome,data.user.Username,data.user.Immagine,
                                           data.user.Nato,competenze,data.user.TitoloStudio,data.user.CF,
                                           data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                           data.user.Email,data.user.NumTelefono,data.user.Tipologia,data.user.Sesso,data.preferiti))
      console.log(this.shareService.getOtherUser())

    }
    console.log("getOtherUser",this.shareService.getOtherUser());
    this.profilo();

} //if
})
}//getInfo

profilo(){
  let obj = {other: true,miracolo:true};
  this.events.publish('other', obj);
}

alert_preferiti(){
  let alert = this.alertCtrl.create({
    title: 'Preferiti',
    message:'Digitare l\' username dell\'utente da inserire',
    cssClass:"alert",
    inputs: [
      {
        name: 'preferito',
        type: 'text',
        value:this.nuovo,

      }
    ],

    buttons: ['Annulla' ,
    {
      text: 'Conferma',
      handler: data => {
        console.log(data)
        this.insert_preferito(data.preferito)
      }
    }]
  });
  alert.present();
}

insert_preferito(nome){

  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
  let options = new RequestOptions({ headers: headers });
  if(this.navParams.get('other') != undefined)
  var myData = JSON.stringify({utente: this.shareService.getOtherUser().getUsername(),preferito: nome});
  else
  var myData = JSON.stringify({utente: this.shareService.getUser().getUsername(),preferito: nome});
  console.log("campania",myData)
  this.http.post('http://aiutiamoc.altervista.org/Insert_Preferito.php',myData,options).map(res => res.json()).subscribe(   data => {
    console.log("ciccio",data);
    this.dialogs.alert(""+data.message)
    if(data.message == 'Operazione eseguita con successo')
      this.preferiti.push(nome)
  })

}

}
