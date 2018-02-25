import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import {
 LatLng,
 Spherical
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { ShareService } from '../../providers/shareService';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { TabsPage } from '../tabs/tabs';
import { RisultatiRicercaEventiPage } from '../risultati-ricerca-eventi/risultati-ricerca-eventi';

import { Dialogs } from '@ionic-native/dialogs';


@IonicPage()
@Component({
  selector: 'page-ricerca-eventi',
  templateUrl: 'ricerca-eventi.html',
})
export class RicercaEventiPage {
eventi:Array<any>=[];
searchAssociazioni:Array<string>=[];
allAssociazioni:Array<any>=[];
result:Array<string>=[];
firstValue:number;
my: LatLng;
other: LatLng;
index:number;
distance:number;
nome:string =""



  constructor(public dialogs:Dialogs,public modalCtrl: ModalController,public alertCtrl: AlertController,public nativeStorage: NativeStorage, geolocation: Geolocation, public nativeGeocoder: NativeGeocoder,public shareService: ShareService,public http:Http,public spherical: Spherical,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RicercaPage');
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/getAssociazioni_ricerca.php',options).map(res => res.json()).subscribe(   data => {
      console.log("data",data)
      for(var elem of data.eventi){
        this.eventi.push(JSON.parse(elem))
      }
      this.allAssociazioni = data.associazioni;
      this.nativeGeocoder.forwardGeocode(this.shareService.getUser().getIndirizzo()+","+this.shareService.getUser().getCitta())
        .then((coordinates: NativeGeocoderForwardResult) =>{
          var lat = Number(coordinates.latitude);
          var lng = Number(coordinates.longitude);

          this.my = new LatLng(lat,lng);

        })
        .catch((error: any) => console.log(error))
   })

  }


ricerca(){
this.result=[];
this.index = 0;
for( this.index = 0; this.index <this.eventi.length;this.index++){
      this.aiutatm(this.index);
}


}


aiutatm(index){
  this.nativeGeocoder.forwardGeocode(this.eventi[this.index].Luogo)
    .then((coordinates: NativeGeocoderForwardResult) =>{
      var lat = Number(coordinates.latitude);
      var lng = Number(coordinates.longitude);
      console.log("lat",lat,"lng",lng)
      this.other = new LatLng(lat,lng);
      this.distance = Spherical.computeDistanceBetween(this.my,this.other)
      if((this.distance/1000) <= this.firstValue){

        this.result.push(this.eventi[index].username_associazione)
    //    console.log("username",JSON.parse(this.eventi[index]).username_associazione,this.distance/1000)
    }
    var myData = JSON.stringify({risultati:this.result,associazioni:this.searchAssociazioni,nome:this.nome});

    if(index == (this.eventi.length-1)){
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );
      let options = new RequestOptions({ headers: headers });

      console.log("myData",myData);
      this.http.post('http://aiutiamoc.altervista.org/risultatiRicercaEventi.php',myData,options).map(res => res.json()).subscribe(   data => {
      console.log("post",data);
        if(data.message != undefined)
          this.dialogs.alert(data.message)
        else{
          this.navCtrl.push(RisultatiRicercaEventiPage,{risultati:data})
        }
    })
    }

    })
    .catch((error: any) => console.log(error));
}






openModal() {

  this.shareService.setMyCompetenze(this.searchAssociazioni)
  this.shareService.setOtherCompetenze(this.allAssociazioni)
  let obj = {page: false};
  let myModal = this.modalCtrl.create(TabsPage,obj);
  myModal.present();

  myModal.onDidDismiss(data => {

      this.searchAssociazioni = this.shareService.getMyCompetenze();
      this.allAssociazioni = this.shareService.getOtherCompetenze()


});

}

}
