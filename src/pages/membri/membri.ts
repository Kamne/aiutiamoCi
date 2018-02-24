import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../providers/shareService';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Associazione } from '../../classes/associazione';
import { Utente } from '../../classes/utente';
import { TabsProfiloUtentePage } from '../tabs-profilo-utente/tabs-profilo-utente';
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

  constructor(public http:Http,public shareService: ShareService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembriPage');
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
     let obj = {other: true};
    this.navCtrl.push(TabsProfiloUtentePage,obj);
} //if
})
}
}
