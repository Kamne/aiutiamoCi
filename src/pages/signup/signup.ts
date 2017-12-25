import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
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
      let postParams = {
        username: 'username',
        password: 'password'
      }
  //   let postParams = "username="+username.value+"&password="+password.value+"&nome="+nome.value+"&cognome="+cognome.value+"&tipologia="+tipologia.value+"&password="+password.value+"&password="+password.value+"&password="+password.value+"&password="+password.value+"&password="+password.value+"&password="+password.value+"&password="+password.value;
   var myData = JSON.stringify({nome:nome.value ,cognome:cognome.value,username: username.value,password: password.value,tipologia:tipologia.value,nato:data.value,competenze:competenze.value,titolo:titolo.value,cf:cf.value,indirizzo:indirizzo.value,citta:citta.value,provincia:provincia.value,email:email.value,tel:tel.value});
  // var myData = JSON.stringify({username: username.value,password: password.value});
 //console.log(myData)
  this.http.post('http://aiutiamoc.altervista.org/registrazioneUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
  console.log(data);})
}

}
