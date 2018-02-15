import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Dialogs } from '@ionic-native/dialogs';
import { ClickBlock } from 'ionic-angular/components/app/click-block';

/**
 * Generated class for the FaqAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq-admin',
  templateUrl: 'faq-admin.html',
})
export class FaqAdminPage {

  public data: any = {};
  public domande:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public dialogs: Dialogs, public formBuilder: FormBuilder) {
    //this.faqList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqAdminPage');
  }

  faqList() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getDomande.php',options).map(res => res.json()).subscribe(    data => {
      //console.log("myjson",JSON.parse(data.nonRisposte[1]));

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
      // iterazione di JSON.parse(data.Risposte[i]) 
      // andare nella console del browser (ISPEZIONA ELEMENTO)
      
      
    });
  } 

  rispondiDomande() { 
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getDomande.php',options).map(res => res.json()).subscribe(    data => {
      var node = document.getElementById("rispondi");      
      var numElem = data.nonRisposte.length;
      alert(numElem);
      for(var i = 0 ;i<numElem;i++) {

        console.log("myjson"+i,JSON.parse(data.nonRisposte[i]));
        var parse = JSON.parse(data.nonRisposte[i]);
        var h1 = document.createElement("H1");
        var domText = document.createTextNode(parse.domanda);
        h1.appendChild(domText);
        node.appendChild(h1);
       
        // creare il bottone e la relativa funzionalità
        var btn = document.createElement("BUTTON");
        btn.setAttribute("value",parse.domanda);
        var t = document.createTextNode("RISPONDI");
        btn.appendChild(t);
        node.appendChild(btn);
        var br = document.createElement("BR");
        node.appendChild(br);
       }
    });
  }
}
