import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {MapPage} from '../map/map';
import { Dialogs } from '@ionic-native/dialogs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ciccio:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder) {
    this.ciccio = formBuilder.group({
       nome: [''],
       cognome: [''],
       username: ['']
    /*   password: [''],
       tipologia:[''],
       nato:[''],
       competenze:[''],
       titolo:[''],
       cf:[''],
       indirizzo:[''],
       citta:[''],
       provincia:[''],
       email:[''],
       tel:[''],
       iva:[''],
       descr: ['']*/
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  // registrazione(nome,cognome,username,password,tipologia,data,competenze,titolo,cf,indirizzo,citta,provincia,email,tel,iva)
  registrazione(nome: HTMLInputElement, cognome: HTMLInputElement,username: HTMLInputElement, password: HTMLInputElement,tipologia: HTMLInputElement, data: HTMLInputElement, competenze: HTMLInputElement, titolo: HTMLInputElement, cf: HTMLInputElement, indirizzo: HTMLInputElement, citta: HTMLInputElement, provincia: HTMLInputElement , email: HTMLInputElement, tel: HTMLInputElement, iva: HTMLInputElement,descr: HTMLInputElement): void {
    var headers = new Headers();
    console.log(descr.value)
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
   let options = new RequestOptions({ headers: headers });
   var myData = JSON.stringify({
     nome:nome.value,
     cognome:cognome.value,
     username: username.value,
     password: password.value,
     tipologia:tipologia.value,
     nato:data.value,
     competenze:competenze.value,
     titolo:titolo.value,
     cf:cf.value,
     indirizzo:indirizzo.value,
     citta:citta.value,
     provincia:provincia.value,
     email:email.value,
     tel:tel.value,
     iva:iva.value,
     descr: descr.value
   });
   console.log(myData)
 this.http.post('http://aiutiamoc.altervista.org/registrazioneUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
  console.log(data.success);
  if(data.success){
      console.log("nel if "+data.success);
      this.navCtrl.setRoot(LoginPage)
  }

  else{
    this.dialogs.alert(data.message)
  }
      console.log(data.message)

})
}

geolocalization(){
  this.navCtrl.setRoot(MapPage)
}
onChange(v){
  if(v=="associazione"){
    document.getElementById("iva").style.display="block";
    document.getElementById("descr").style.display="block";
  }else{
    document.getElementById("iva").style.display="none";
    document.getElementById("descr").style.display="none";
  }
  if(v=="assistente" || v=="amministratore"){
    document.getElementById("cognome").style.display="block";
    document.getElementById("titolo").style.display="block";
    document.getElementById("competenze").style.display="block";
    document.getElementById("cf").style.display="block";
  }else{
    document.getElementById("cognome").style.display="none";
    document.getElementById("titolo").style.display="none";
    document.getElementById("competenze").style.display="none";
    document.getElementById("cf").style.display="none";
  }
  if(v=="utente"){
    document.getElementById("cognome").style.display="block";
    document.getElementById("cf").style.display="block";
  }

  console.log(v);
}

}
