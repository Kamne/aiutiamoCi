import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InserisciPage');
  }

  indietro(){
    this.navCtrl.setRoot(HomePage);
  }

  getPermission() {
    this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
          if (!hasPermission) {
            this.speechRecognition.requestPermission();
          }
        });
  }
  startListening() {
    this.getPermission();

    let options = {
      language: 'it-IT'
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
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
