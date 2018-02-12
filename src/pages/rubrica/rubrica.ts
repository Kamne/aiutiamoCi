import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

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
  searchQuery: string = '';
  public list:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RubricaPage');
  }

  getAssistenti() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    //let options = new RequestOptions({ headers: headers });
    this.http.get('http://aiutiamoc.altervista.org/getAssistenti.php')
  .subscribe(data => {
    this.data.response=data["_body"].split(";");
    this.data.response.pop();
    }, error => {
      alert("Oooops!");
    });
  }

  getAssociazioni(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    this.http.get('http://aiutiamoc.altervista.org/getAssociazioni.php')
  .subscribe(data => {
      console.log(data);
      this.data.response=data["_body"].split(";");
      this.data.response.pop();
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
}