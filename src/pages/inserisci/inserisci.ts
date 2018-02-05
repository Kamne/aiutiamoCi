import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { ShareService } from '../../providers/shareService';

/**
 * Generated class for the InserisciPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inserisci',
  templateUrl: 'inserisci.html',
})
export class InserisciPage {
  matches: String[];
  isRecording = false;
  value:string[];
  testo:String;
  richiesta:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef,public http: Http,public dialogs: Dialogs, public shareService : ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InserisciPage');
    this.testo = "salve a tutti"
    this.speechRecognition.isRecognitionAvailable()
  .then((available: boolean) => console.log("recognition "+available))
  }

  indietro(testo: HTMLInputElement,patente: HTMLInputElement,automunito: HTMLInputElement,urgenza: HTMLInputElement){
    console.log("prova "+ this.richiesta)
    var headers = new Headers();


  //  console.log(descr.value)
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    var myData = JSON.stringify({
        automunito : Number(automunito.checked),
        patente : Number(patente.checked),
        urgenza : Number(urgenza.checked),
        testo : this.testo,
        tipologia : this.richiesta,
        username : this.shareService.getUser().getUsername(),
        tel : this.shareService.getUser().getTel(),
        email : this.shareService.getUser().getEmail(),
        data : this.shareService.getUser().getNato(),
        competenze : this.shareService.getUser().getToStringCompetenze()
    });
    console.log(myData)

    this.http.post('http://aiutiamoc.altervista.org/Insert_Annuncio.php',myData,options).map(res => res.json()).subscribe(   data => {
     console.log(data.success);
     if(data.success){
         console.log("nel if "+data.success);
         this.navCtrl.setRoot(HomePage)
     }

     else{
       this.dialogs.alert(data.message)
     }
         console.log(data.message)

   })

  }

  getPermission() {
    this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
          if (!hasPermission) {
            this.speechRecognition.requestPermission()
  .then(
    () => console.log('Granted'),
    () => console.log('Denied')
  );
          }
        });
  }
  startListening() {
    this.getPermission();

    let options = {
      language: 'it-IT'
    }
      console.log("salve ciccio")
    this.speechRecognition.startListening(options).subscribe(matches => {
            console.log("salve ciccio")
      this.matches = matches;
      console.log(matches)
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  private textareaValue = '';
  doTextareaValueChange(ev) {
    try {
      this.textareaValue = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }




}
