import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-rubrica',
  templateUrl: 'rubrica.html',
})

export class RubricaPage {

  public assistenti: any = [];
  public associazioni: any = [];
  public searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RubricaPage');
  }

  getAssistenti() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getAssistenti.php',options).map(res => res.json()).subscribe(    data => {
      var node = document.getElementById("div_assistenti");
      var elements = data.assistenti.length;
      for (var i=0; i<elements; i++) {
        console.log("myLogAssistente",JSON.parse(data.assistenti[i]));
        var parse = JSON.parse(data.assistenti[i]);
        this.assistenti[i] = parse;
       }
    }, error => {
      alert("Oooops!");
    });
  }

  getAssociazioni(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getAssociazioni.php',options).map(res => res.json()).subscribe(    data => {
      var node = document.getElementById("div_associazioni");
      var elements = data.associazioni.length;
      for (var i=0; i<elements; i++) {
        console.log("myLogAssistente",JSON.parse(data.associazioni[i]));
        var parse = JSON.parse(data.associazioni[i]);
        this.associazioni[i] = parse;
       // inserire l'if
       
       }
    }, error => {
      alert("Oooops!");
    });
  }

  getItems(ev: any) {

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.associazioni = this.associazioni.filter((a) => {
        return (a.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val && val.trim() != '') {
      this.assistenti = this.assistenti.filter((a) => {
        return (a.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

  mail() {
    
  }

  call() {

  }

}