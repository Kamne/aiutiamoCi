import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { EmailComposer } from '@ionic-native/email-composer';
/**
 * Generated class for the PasswordDimenticataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-dimenticata',
  templateUrl: 'password-dimenticata.html',
})
export class PasswordDimenticataPage {
radioTel:boolean = true;
radioEmail:boolean = false;
tel:string = ""
email:string = ""
  constructor(public sms: SMS,public emailComposer: EmailComposer,public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordDimenticataPage');
  }
boom(){
  var headers = new Headers();

  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
 let options = new RequestOptions({ headers: headers });
  var myData = JSON.stringify({
    tel:this.tel,
    email:this.email,
  });
  console.log(myData)
  this.http.post('http://aiutiamoc.altervista.org/PasswordDimenticata.php',myData,options).map(res => res.json()).subscribe(   data => {
   console.log(data.risultati);
   if(data.success){
     if(this.radioTel){
       this.sms.send(this.tel, 'La tua password é: '+data.risultati);
     }
     else{
       //this.sms.send(this.tel, 'La tua password é:',data.risultati);
     }
   }
  else
    console.log("oh stracacchio")
 })
}
cambio(v){
  console.log("evento",v)
  if(this.radioTel){
    this.radioTel = false;
    this.tel = ""
    this.radioEmail = true;
  }
  else{
    this.radioTel = true;
        this.email = ""
    this.radioEmail = false;
  }
  console.log(this.radioTel)
  console.log(this.radioEmail)
}
}
