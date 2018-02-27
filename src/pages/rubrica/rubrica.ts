import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
import {Associazione} from '../../classes/associazione';
import {TabsProfiloUtentePage} from '../../pages/tabs-profilo-utente/tabs-profilo-utente';
import {ProfiloAssociazioneTabsPage} from '../../pages/profilo-associazione-tabs/profilo-associazione-tabs';

@IonicPage()
@Component({
  selector: 'page-rubrica',
  templateUrl: 'rubrica.html',
})

export class RubricaPage {

  public assistenti: Array <string>;
  public associazioni: Array <string>;
  public searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public shareService: ShareService) {
    this.inizialize();
  }

  inizialize() {
    this.assistenti=[];
    this.associazioni=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RubricaPage');
  }

  getAssistenti() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getAssistenti.php',options).map(res => res.json()).subscribe(    data => {
      var node = document.getElementById("div_assistenti");
      var elements = data.assistenti.length;
      for (var i=0; i<elements; i++) {
        console.log("myLogAssistente",JSON.parse(data.assistenti[i]));
        var parse = JSON.parse(data.assistenti[i]);
        this.assistenti[i] = parse;
       }
    }, error => {
      alert("Oooops!");
    });
  }

  getAssociazioni(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getAssociazioni.php',options).map(res => res.json()).subscribe(    data => {
      var node = document.getElementById("div_associazioni");
      var elements = data.associazioni.length;
      for (var i=0; i<elements; i++) {
        console.log("myLogAssistente",JSON.parse(data.associazioni[i]));
        var parse = JSON.parse(data.associazioni[i]);
        this.associazioni[i] = parse;
       }
    }, error => {
      alert("Oooops!");
    });
  }

  informazioniUtente(username: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    var myData = JSON.stringify({username: username});
    this.http.post('http://aiutiamoc.altervista.org/getUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        var competenze = data.user.Competenze.split(",")
        this.shareService.setUser(new Utente(data.user.Nome,data.user.Cognome,data.user.Username,data.user.Immagine,
                                            data.user.Nato,competenze,data.user.TitoloStudio,data.user.CF,
                                            data.user.Citta,data.user.Provincia,data.user.Indirizzo,
                                            data.user.Email,data.user.NumTelefono,data.user.Tipologia,data.user.Sesso,data.preferiti));


        console.log(username,data.user);
        this.navCtrl.push(TabsProfiloUtentePage);
      }
      else {
        alert("Oooops!");
      }
    })
  }

  informazioniAssociazione(username: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    var myData = JSON.stringify({username: username});
    this.http.post('http://aiutiamoc.altervista.org/infoAssociazione.php',myData,options).map(res => res.json()).subscribe(   data => {
      if(data.success){
      this.shareService.setUser(new Associazione(data.associazione.Nome,data.associazione.Username,data.associazione.Immagine,
                                           data.associazione.Descrizione,data.associazione.Fondata,data.associazione.PartitaIVA,
                                           data.associazione.Citta,data.associazione.Provincia,data.associazione.Indirizzo,
                                           data.associazione.Email,data.associazione.NumTelefono,data.associazione.Tipologia,data.membri));
      console.log(username,data.associazione);
      this.navCtrl.push(ProfiloAssociazioneTabsPage);
      }
      else {
        alert("Oooops!");
      }
    })
  }

  getItems(ev: any) {
    this.inizialize();
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.associazioni = this.associazioni.filter((a) => {
        return (a.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.assistenti = this.assistenti.filter((a) => {
        return (a.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

}
