import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {MapPage} from '../map/map';
import { Dialogs } from '@ionic-native/dialogs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events } from 'ionic-angular';
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
  base64Image:String = "assets/imgs/anonimo.png"
  citta:String
  indirizzo:String
  provincia:String

  constructor(public events: Events,public camera: Camera,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder) {
    this.citta = ""
this.indirizzo = ""
this.provincia = ""
    events.subscribe('maps', (maps) => {
      this.indirizzo = maps[0];
      this.citta = maps[1];
      this.provincia = maps[2];
  console.log('Welcome', maps);
});
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
  registrazione(nome: HTMLInputElement, cognome: HTMLInputElement,username: HTMLInputElement, password: HTMLInputElement,tipologia: HTMLInputElement, data: HTMLInputElement, competenze: HTMLInputElement, titolo: HTMLInputElement, cf: HTMLInputElement, email: HTMLInputElement, tel: HTMLInputElement, iva: HTMLInputElement,descr: HTMLInputElement): void {
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
     indirizzo:this.indirizzo,
     citta:this.citta,
     provincia:this.provincia,
     email:email.value,
     tel:tel.value,
     iva:iva.value,
     descr: descr.value,
     img:this.base64Image
   });
   console.log(myData);
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
  this.navCtrl.push(MapPage)
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

chargeImage(){
  let alert = this.alertCtrl.create({
    title: 'Immagine del profilo',
    cssClass:"alert",
    inputs: [
      {
        name: 'foto',
        type: 'radio',
        value:'camera',
        label:'Fotocamera'
      },
      {
        name: 'foto',
        type: 'radio',
        value:'gallery',
        label:'Galleria'
      }
    ],

    buttons: ['Annulla' ,
    {
      text: 'Conferma',
      handler: data => {
          this.takeImg(data)
      }
    }]
  });
  alert.present();
}

takeImg(source){

  if(source == "gallery"){
    console.log("galleria")
    const options: CameraOptions = {
  quality: 100,
  sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  destinationType: this.camera.DestinationType.DATA_URL,

  mediaType: this.camera.MediaType.PICTURE}

  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   this.base64Image = 'data:image/jpeg;base64,' + imageData;

   console.log(""+this.base64Image)
  }, (err) => {
   // Handle error
  });


  }
  else{
    console.log("foto")
    const options: CameraOptions = {
  quality: 100,
  sourceType: this.camera.PictureSourceType.CAMERA ,
  destinationType: this.camera.DestinationType.DATA_URL,
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/jpeg;base64,' + imageData;

 console.log(""+this.base64Image)
}, (err) => {
 // Handle error
});
  }
}

}
