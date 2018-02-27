import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the OpzioniAmministratorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opzioni-amministratore',
  templateUrl: 'opzioni-amministratore.html',
})
export class OpzioniAmministratorePage {

  posts: any;
  configUrl = 'http://aiutiamoc.altervista.org/getUtenti.php';
  configUrl_1 = 'http://aiutiamoc.altervista.org/eliminaUtente.php';
  configUrl_annunci = 'http://aiutiamoc.altervista.org/getAnnunci.php';
  configUrl_eliminaannunci = 'http://aiutiamoc.altervista.org/eliminaAnnuncio.php';
  utenti:boolean=false;
  annunci:boolean=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpzioniAmministratorePage');
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }
  getUtenti(){
    this.utenti = true;
    this.annunci = false;
    /*
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    */
    this.getConfigGet(this.configUrl).map(res => res.json()).subscribe(    data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.posts = data.items;
      }else{
        this.presentAlert("Valori errati")
      }
    });
  }
  getAnnunci(){
    this.utenti = false;
    this.annunci = true;
    this.getConfigGet(this.configUrl_annunci).map(res => res.json()).subscribe(    data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.posts = data.items;
      }else{
        this.presentAlert("Valori errati")
      }
    });
  }
  getConfigGet(url) {
    return this.http.get(url);
  }
  getConfigPost(url, myData) {
    return this.http.post(url,myData);
  }
  elimina_utente(utente, tipologia){
    console.log(utente);
    var myData = JSON.stringify({username: utente, tipologia: tipologia});
    this.getConfigPost(this.configUrl_1,myData).map(res => res.json()).subscribe(    data => {
      console.log(data);
      if(data.success){
        this.presentAlert("Utente eliminato con successo.");
      }else{
        this.presentAlert("Valori errati")
      }
    });
  }
  elimina_annuncio(utente, testo){
    console.log(testo);
    var myData = JSON.stringify({username: utente, testo: testo});
    this.getConfigPost(this.configUrl_eliminaannunci,myData).map(res => res.json()).subscribe(    data => {
      console.log(data);
      if(data.success){
        this.presentAlert("Annuncio eliminato con successo.");
      }else{
        this.presentAlert("Valori errati")
      }
    });
  }
}
