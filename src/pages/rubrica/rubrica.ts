import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";

/**
 * Generated class for the RubricaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rubrica',
  templateUrl: 'rubrica.html',
})
export class RubricaPage {
  public data:any = {};
  public list:any = {};

  public assistenti: any = [];
  public associazioni: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RubricaPage');
  }

  getAssistenti() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getMembri.php',options).map(res => res.json()).subscribe(    data => {
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
    this.http.post('http://aiutiamoc.altervista.org/getMembri.php',options).map(res => res.json()).subscribe(    data => {
      var node = document.getElementById("div_associazioni");
      var elements = data.associazioni.length;
      for (var i=0; i<elements; i++) {
        console.log("myLogAssistente",JSON.parse(data.associazioni[i]));
        var parse = JSON.parse(data.associazioni[i]);
        this.associazioni[i] = parse;
       }
    }, error => {
      alert("Oooops!");
    });
  }

  generateList() {
    this.list=this.data.response;
  }

  getItems(ev: any) { 
    this.generateList();
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
      this.data.response = this.data.response.filter((topic) => {
        return (topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }

  mail() {
    
  }

  call() {

  }

}