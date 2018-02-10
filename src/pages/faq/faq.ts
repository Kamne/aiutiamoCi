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

  public data: any = {};
  domande: Domanda;


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
    this.http.post('http://aiutiamoc.altervista.org/getDomande.php',options).subscribe(    data => {
      this.data.response=data["_body"].split("|");
      this.data.response.pop();

      var node = document.getElementById("domande");
      
      var elements = data["_body"].split("|").length - 1;
    
      for(var i = 0 ;i<elements;i++) { 
        // inserire le decorazioni!
        var h1 = document.createElement("H1");  
        var textnode = document.createTextNode(this.data.response[0]);
        h1.appendChild(textnode);
        node.appendChild(h1);
        this.data.response.shift();
        elements--;
        var h2 = document.createElement("H2"); 
        var risp = document.createTextNode(this.data.response[0]);
        node.appendChild(risp);
        var br = document.createElement("BR");
        this.data.response.shift();
        elements--;
        alert(elements);  
        node.appendChild(br);
     }
      
    });
  } 
}
