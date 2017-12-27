import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {MapPage} from '../map/map';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  registrazione(nome: HTMLInputElement, cognome: HTMLInputElement,username: HTMLInputElement, password: HTMLInputElement,tipologia: HTMLInputElement, data: HTMLInputElement, competenze: HTMLInputElement, titolo: HTMLInputElement, cf: HTMLInputElement, indirizzo: HTMLInputElement, citta: HTMLInputElement, provincia: HTMLInputElement , email: HTMLInputElement, tel: HTMLInputElement): void {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
   let options = new RequestOptions({ headers: headers });
   var myData = JSON.stringify({nome:nome.value ,cognome:cognome.value,username: username.value,password: password.value,tipologia:tipologia.value,nato:data.value,competenze:competenze.value,titolo:titolo.value,cf:cf.value,indirizzo:indirizzo.value,citta:citta.value,provincia:provincia.value,email:email.value,tel:tel.value});
  this.http.post('http://aiutiamoc.altervista.org/registrazioneUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
  console.log(data);})
}

geolocalization(){
  this.navCtrl.setRoot(MapPage)
}
 onChange(v){
   if(v=="associazione"){
     document.getElementById("iva").style.display="block";
   }else{
     document.getElementById("iva").style.display="none";
   }
   if(v=="assistente"){
     document.getElementById("titolo").style.display="block";
     document.getElementById("competenze").style.display="block";
   }else{
     document.getElementById("titolo").style.display="none";
     document.getElementById("competenze").style.display="none";
   }

   console.log(v);
 }
}
