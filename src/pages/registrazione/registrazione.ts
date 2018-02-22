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
sex:String = "Sesso"
nome:String = ""
cognome:String = ""
username:String = ""
password:String = ""
codFis:String = ""
data:String = ""
showAssociazione:boolean=false;
showAssistente:boolean=false;

descr:String = ""
iva:String = ""

citta:String = ""
indirizzo:String = ""
provincia:String = ""

tel:String = ""
email:String = ""

myCompetenze:Array<string> =[]
otherCompetenze:Array<string> =[]
titStudio:String = "";


  constructor(public shareService: ShareService,public modalCtrl: ModalController,public events: Events,public camera: Camera,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder) {
    events.subscribe('maps', (maps) => {
      this.indirizzo = maps[0];
      this.citta = maps[1];
      this.provincia = maps[2];
    console.log('Welcome', maps);
    });
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad MapPage');
}

  registrazione(tipologia: HTMLInputElement, sesso: HTMLInputElement): void {
    var headers = new Headers();
    console.log("sesso",this.sex)
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
   let options = new RequestOptions({ headers: headers });
   var myData = JSON.stringify({
     nome:this.nome,
     cognome:this.cognome,
     username: this.username,
     password: this.password,
     tipologia:tipologia.value,
     nato:this.data,
     sesso:this.sex,
     competenze:","+this.myCompetenze.toString()+",",
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
   console.log(myData);
 this.http.post('http://aiutiamoc.altervista.org/registrazioneUtente.php',myData,options).map(res => res.json()).subscribe(   data => {
  console.log(data);
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
        this.showAssociazione =true;
          this.showAssistente = false;
    }
    if(v=="assistente" || v=="amministratore"){
      this.showAssociazione =false;
      this.showAssistente = true;
      if(this.otherCompetenze.length == 0){
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://aiutiamoc.altervista.org/ricercaUtenti.php',options).map(res => res.json()).subscribe(   data => { //usato per prendere le competenze xD
        console.log(data);

        this.otherCompetenze = data.competenze;

     })

    }
  }
    if(v=="utente"){
          this.showAssistente =false;
          this.showAssociazione =false;

    }

    console.log(v);
  }

competenze(){

  this.shareService.setMyCompetenze(this.myCompetenze)

  this.shareService.setOtherCompetenze(this.otherCompetenze)
  let obj = {page: true};
  let myModal = this.modalCtrl.create(TabsPage,obj);
  myModal.present();

  myModal.onDidDismiss(data => {

      this.myCompetenze = this.shareService.getMyCompetenze();
      this.otherCompetenze = this.shareService.getOtherCompetenze()


});
}

selected(name:string,array:Array<string>){

    var idx = array.indexOf(name);
    console.log("",idx)
    if(idx>-1)
    array.splice(idx, 1);

}

}
