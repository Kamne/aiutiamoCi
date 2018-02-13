import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {MapPage} from '../map/map';
import { Dialogs } from '@ionic-native/dialogs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';
import { Events } from 'ionic-angular';
import { ShareService } from '../../providers/shareService';

@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {
@ViewChild(Slides) slides: Slides;

ciccio:FormGroup;
base64Image:String = "assets/imgs/anonimo.png"


tipologia:String = "Scegli una tipologia"
sesso:String = "Sesso"
nome:String = ""
cognome:String = ""
username:String = ""
password:String = ""
codFis:String = ""
data:String = ""

descr:String = ""
iva:String = ""

citta:String = ""
indirizzo:String = ""
provincia:String = ""

tel:String = ""
email:String = ""

myCompetenze:Array<string> =[]
titStudio:String = "";
allCompetenze:Array<string> =[]

  constructor(public shareService: ShareService,public modalCtrl: ModalController,public events: Events,public camera: Camera,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder) {
    events.subscribe('maps', (maps) => {
      this.indirizzo = maps[0];
      this.citta = maps[1];
      this.provincia = maps[2];
    console.log('Welcome', maps);
    });
  }



  ionViewDidLoad() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/ricercaUtenti.php',options).map(res => res.json()).subscribe(   data => {
      console.log(data)
      this.allCompetenze = data.competenze;
   })
  }

  registrazione(tipologia: HTMLInputElement, sesso: HTMLInputElement): void {
    var headers = new Headers();
    console.log(this.competenze)
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
   let options = new RequestOptions({ headers: headers });
   var myData = JSON.stringify({
     nome:this.nome,
     cognome:this.cognome,
     username: this.username,
     password: this.password,
     tipologia:tipologia.value,
     nato:this.data,
     sesso:sesso.value,
     competenze:this.competenze,
     titolo:this.titStudio,
     cf:this.codFis,
     indirizzo:this.indirizzo,
     citta:this.citta,
     provincia:this.provincia,
     email:this.email,
     tel:this.tel,
     iva:this.iva,
     descr: this.descr,
     img:this.base64Image
   });
 this.http.post('http://aiutiamoc.altervista.org/registrazioneUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
  console.log(data.success);
  if(data.success){
      this.navCtrl.setRoot(LoginPage)
  }

  else{
    this.dialogs.alert(data.message)
  }
      console.log(data.message)

})
}


  avanti() {
    this.slides.slideNext();
  }

  indietro() {
    this.slides.slidePrev();
  }

  indietrissimo() {
    this.navCtrl.setRoot(LoginPage)
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

competenze(){
  console.log("prima",this.allCompetenze)
  this.shareService.setMyCompetenze(this.myCompetenze)
  console.log("dopo",this.shareService.getMyCompetenze())
  this.shareService.setAllCompetenze(this.allCompetenze)
  let myModal = this.modalCtrl.create(TabsPage);
  myModal.present();

  myModal.onDidDismiss(data => {
    if(data != undefined){
      this.myCompetenze = data;
      for(let data of this.myCompetenze) {
            this.selected(data,this.allCompetenze)
      }

    }
    console.log("ho ricevuto dal modal",this.myCompetenze)
});
}

selected(name:string,array:Array<string>){

    var idx = array.indexOf(name);
    if(idx != -1)
    array.splice(idx, 1);

}

}
