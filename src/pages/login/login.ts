import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import { Http, Headers, RequestOptions } from "@angular/http";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(username: HTMLInputElement, password: HTMLInputElement): void {


  if(username.value === "" || password.value === "")
      console.log("valori errati")
  else{
    var myData = JSON.stringify({username: username.value,password: password.value});
  this.http.post('http://aiutiamoc.altervista.org/login.php',myData).map(res => res.json()).subscribe(   data => {
  console.log(data);})
  }
}

signup() {
  this.navCtrl.push(SignupPage);
}

}
