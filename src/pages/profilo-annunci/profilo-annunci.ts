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
  radioOfferta:boolean=false;
  radioRichiesta:boolean=true;

  constructor(public shareService:ShareService,public http:Http,public navCtrl: NavController, public navParams: NavParams) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    if(navParams.get('other') != undefined)
    var myData = JSON.stringify({username:this.shareService.getOtherUser().getUsername()});
    else
    var myData = JSON.stringify({username:this.shareService.getUser().getUsername()});
    console.log("myData",myData);
    this.http.post('http://aiutiamoc.altervista.org/profiloAnnunci.php',myData,options).map(res => res.json()).subscribe(   data => {
    console.log("post",data);
    var elem
  //  this.richieste = data.richieste
    for( elem of data.richieste) {
    //JSON.parse(x)
    console.log(elem);
    this.richieste.push(JSON.parse(elem))
}

console.log("richieste",this.richieste)
var i;
    for(i=0;i<data.offerte.length;i++) {
      this.offerte.push(JSON.parse(data.offerte[i]))
  }
  console.log("offerte",this.offerte)
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloAnnunciPage');
  }

richiesta(){

this.radioRichiesta = true
this.radioOfferta = false
}

offerta(){

  this.radioRichiesta = false
  this.radioOfferta = true
  console.log(this.radioOfferta,this.radioRichiesta)
}



}
