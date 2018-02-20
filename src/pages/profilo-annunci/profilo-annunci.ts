import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { ShareService } from '../../providers/shareService';

/**
 * Generated class for the ProfiloAnnunciPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo-annunci',
  templateUrl: 'profilo-annunci.html',
})
export class ProfiloAnnunciPage {

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  richieste:any=[];
  offerte:any=[];

  constructor(public shareService:ShareService,public http:Http,public navCtrl: NavController, public navParams: NavParams) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    var myData = JSON.stringify({username:this.shareService.getUser().getUsername()});
    console.log("myData",myData);
    this.http.post('http://aiutiamoc.altervista.org/profiloAnnunci.php',myData,options).map(res => res.json()).subscribe(   data => {
    console.log("post",data.offerte);
  //  this.richieste = data.richieste
    for(var x in data.richieste) {
    //JSON.parse(x)
    console.log(x);
  //  this.richieste.push(JSON.parse(x))
}
console.log(this.richieste)
var i;
    for(i=0;i<data.offerte.length;i++) {
      this.offerte.push(JSON.parse(data.offerte[i]))
  }
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloAnnunciPage');
  }





}
