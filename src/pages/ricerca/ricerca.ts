import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
/**
 * Generated class for the RicercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-ricerca',
  templateUrl: 'ricerca.html',
})
export class RicercaPage {
indirizzi:Array<any>=[];
competenze:Array<any>=[];
result:Array<string>=[];
  singleValue:number;
  my: LatLng;
other: LatLng;
index:number;
distance:number;
  constructor(public nativeStorage: NativeStorage, geolocation: Geolocation, public nativeGeocoder: NativeGeocoder,public shareService: ShareService,public http:Http,public spherical: Spherical,public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.setItem('myitem',true)
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

this.nativeStorage.getItem('myitem')
  .then(
    data => console.log("storage",data),
    error => console.error(error)
  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RicercaPage');
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/ricercaUtenti.php',options).map(res => res.json()).subscribe(   data => {

      this.competenze = data.competenze;
      console.log("competenze",data.competenze[0])
      this.indirizzi = data.indirizzi;


      this.nativeGeocoder.forwardGeocode(this.shareService.getUser().getIndirizzo()+","+this.shareService.getUser().getCitta())
        .then((coordinates: NativeGeocoderForwardResult) =>{
          var lat = Number(coordinates.latitude);
          var lng = Number(coordinates.longitude);
          console.log(""+lat);
          this.my = new LatLng(lat,lng);
          console.log(this.my);
        })
        .catch((error: any) => console.log(error))
   })

  }

  onChange(v){
    if(v=="richieste"){
      document.getElementById("richieste").style.display="block";
    }else{
      document.getElementById("richieste").style.display="none";
    }
    if(v=="assistenti"){
      document.getElementById("assistenti").style.display="block";
    }else{
      document.getElementById("assistenti").style.display="none";
    }
    if(v=="eventi"){
      document.getElementById("eventi").style.display="block";
    }else{
      document.getElementById("eventi").style.display="none";
    }
  }

ricerca(){
console.log(this.indirizzi);
this.result=[];
this.index = 0;
for( this.index = 0; this.index <this.indirizzi.length;this.index++){
      this.aiutatm(this.index);
}
console.log("ho finito il for",this.result);

this.vaccini(this.result);
console.log("end vaccini");
}


aiutatm(index){
  this.nativeGeocoder.forwardGeocode(JSON.parse(this.indirizzi[this.index]).Indirizzo+","+JSON.parse(this.indirizzi[this.index]).Citta)
    .then((coordinates: NativeGeocoderForwardResult) =>{
      var lat = Number(coordinates.latitude);
      var lng = Number(coordinates.longitude);

      this.other = new LatLng(lat,lng);
      this.distance = Spherical.computeDistanceBetween(this.my,this.other)
      if((this.distance/1000) <= this.singleValue){
        this.result.push(JSON.parse(this.indirizzi[index]).Username)
        console.log("username",JSON.parse(this.indirizzi[index]).Username)
    }
    var myData = JSON.stringify({risultati:this.result});

    if(index == (this.indirizzi.length-1)){
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );
      let options = new RequestOptions({ headers: headers });

      console.log(myData);
      this.http.post('http://aiutiamoc.altervista.org/risultatiRicercaUtenti.php',myData,options).map(res => res.json()).subscribe(   data => {
      console.log("post",data);

    })
    }
    console.log(myData);

    })
    .catch((error: any) => console.log(error));
}


vaccini(res){
   console.log("vaccini",this.result.length);
   console.log("vaccini",this.result);
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
  let options = new RequestOptions({ headers: headers });

}

}
