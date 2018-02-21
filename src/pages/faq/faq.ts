import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Domanda
{
    domanda: string;
    risposta: string;
}

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})

export class FaqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder) {
    this.faqList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

  faqList() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getDomande.php',options).map(res => res.json()).subscribe(    data => {

      var node = document.getElementById("domanda");
      var elements = data.Risposte.length;

      for (var i=0; i<elements; i++) {
        console.log("myjson"+i,JSON.parse(data.Risposte[i]));
        var parse = JSON.parse(data.Risposte[i]);
        var h1 = document.createElement("H1");
        var domText = document.createTextNode(parse.domanda);
        h1.appendChild(domText);
        node.appendChild(h1);
        var h3 = document.createElement("H3");
        var domRisp = document.createTextNode(parse.risposta);
        h3.appendChild(domRisp);
        node.appendChild(h3);
        var br = document.createElement("BR");
        node.appendChild(br);
      }      
    });
  } 
}
