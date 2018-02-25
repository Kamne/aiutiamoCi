import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NgForm} from '@angular/forms';
import { ShareService } from '../../providers/shareService';
import { Utente } from '../../classes/utente';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the EventCreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-crea',
  templateUrl: 'event-crea.html',
})
export class EventCreaPage{

  categorie: any;
  show: boolean = false;
  tipologia_ : string = "";
  username_associazione: string = "";
  nome_associazione_: string = "";
  base64Image:string = "assets/imgs/evento_img.jpg";
  configUrl_1 = 'http://aiutiamoc.altervista.org/getCategorie.php';
  configUrl_2 = 'http://aiutiamoc.altervista.org/Insert_Evento.php';


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public dialogs: Dialogs,
              public alertCtrl: AlertController,
              public camera: Camera,
              public shareService: ShareService,
              public loading: LoadingController
  ) {

    //accesso solo per le associazioni
    if(shareService.getUser()!=undefined){

      this.tipologia_ = shareService.getUser().getTipologia();
      if(this.tipologia_=="associazione"){
        this.username_associazione = shareService.getUser().getUsername();
        this.nome_associazione_ = shareService.getUser().getNome();
        this.show = true;
      }
    }

    //aggiunge le categorie nel modulo
    var myData = JSON.stringify({tipo: '1'});
    this.getConfig(this.configUrl_1, myData).map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.categorie = data.items;
      }else{
        this.dialogs.alert("Valori errati")
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreaPage');
  }

  onSubmit(f: NgForm){
    console.log(f);
    console.log(f.valid);
 //   var ar = [f.value];
 //   console.log(JSON.stringify(ar));

    var mydata = JSON.stringify(f);
    console.log(mydata);
    let loader = this.loading.create({
  content: 'Caricamento...',
})
loader.present()
    this.getConfig(this.configUrl_2, mydata).map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        loader.dismiss()
        this.dialogs.alert("Dati inseriti");
      }else{
        this.dialogs.alert("Valori errati");
      }

    });

 //   console.log("Nome: "+f.controls['nome'].value);
  }

  /*
  creaEvento(img: HTMLInputElement,
             nome: HTMLInputElement,
             luogo: HTMLInputElement,
             date: HTMLInputElement,
             ora: HTMLInputElement,
             descrizione: HTMLInputElement,
             hashtag: HTMLInputElement): void {
   //   console.log("image:"+img.value);

 /*
    var myData = JSON.stringify({nome: nome.value,password: luogo.value, img: img.value});
  this.http.post('http://aiutiamoc.altervista.org/login.php',myData).map(res => res.json()).subscribe(   data => {
  console.log(data);})
    */
//  }

  getConfig(url, myData) {
    return this.http.post(url,myData);
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
