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
import { RisultatiRicercaPage } from '../risultati-ricerca/risultati-ricerca';
import { Events } from 'ionic-angular';
/**
 * Generated class for the RicercaOffertePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ricerca-offerte',
  templateUrl: 'ricerca-offerte.html',
})
export class RicercaOffertePage {

  indirizzi:Array<any>=[];
  searchCompetenze:Array<string>=[];
  allCompetenze:Array<any>=[];
  result:Array<string>=[];
  firstValue:number;
  secondValue:number;
  my: LatLng;
  other: LatLng;
  index:number;
  distance:number;
  checkAutomunito:boolean=false;
  checkPatentato:boolean=false;
  checkUrgenze:boolean=false;

  constructor(public events: Events,public modalCtrl: ModalController,public alertCtrl: AlertController,public nativeStorage: NativeStorage, geolocation: Geolocation, public nativeGeocoder: NativeGeocoder,public shareService: ShareService,public http:Http,public spherical: Spherical,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RicercaPage');
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://aiutiamoc.altervista.org/ricercaUtenti.php',options).map(res => res.json()).subscribe(   data => {
      console.log("data",data)
      this.allCompetenze = data.competenze;
      this.indirizzi = data.indirizzi;
      this.nativeGeocoder.forwardGeocode(this.shareService.getUser().getIndirizzo()+","+this.shareService.getUser().getCitta())
        .then((coordinates: NativeGeocoderForwardResult) =>{
          var lat = Number(coordinates.latitude);
          var lng = Number(coordinates.longitude);

          this.my = new LatLng(lat,lng);

        })
        .catch((error: any) => console.log(error))
   })

  }

  ricerca(patentato: HTMLInputElement, urgenza: HTMLInputElement,  automunito: HTMLInputElement){
  console.log("automunito",automunito.value,this.checkAutomunito)

  this.result=[];
  this.index = 0;
  for( this.index = 0; this.index <this.indirizzi.length;this.index++){
        this.aiutatm(this.index,patentato.value,urgenza.value,automunito.value);
  }

  }

  aiutatm(index,patentato,urgenza,automunito){
    this.nativeGeocoder.forwardGeocode(JSON.parse(this.indirizzi[this.index]).Indirizzo+","+JSON.parse(this.indirizzi[this.index]).Citta)
      .then((coordinates: NativeGeocoderForwardResult) =>{
        var lat = Number(coordinates.latitude);
        var lng = Number(coordinates.longitude);
        console.log("lat",lat,"lng",lng)
        this.other = new LatLng(lat,lng);
        this.distance = Spherical.computeDistanceBetween(this.my,this.other)
        if((this.distance/1000) <= this.firstValue){
          this.result.push(JSON.parse(this.indirizzi[index]).Username)
          console.log("username",JSON.parse(this.indirizzi[index]).Username,this.distance/1000)
      }
      if(this.result.length == 0){

        return;
      }
      var myData = JSON.stringify({tipologia:"Offerta",risultati:this.result,competenze:this.searchCompetenze.toString(),patentato:Number(this.checkPatentato),urgenza:Number(this.checkUrgenze),automunito:Number(this.checkAutomunito)});

      if(index == (this.indirizzi.length-1)){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded' );
        let options = new RequestOptions({ headers: headers });

        console.log("myData",myData);
        this.http.post('http://aiutiamoc.altervista.org/risultatiRicercaUtenti.php',myData,options).map(res => res.json()).subscribe(   data => {
        console.log("post",data);
        console.log("post",data);
        let obj = {other: true,miracolo:true,ris:data};
        this.events.publish('risRicerca', obj);

      })
      }


      })
      .catch((error: any) => console.log(error));
  }

  openModal() {

    this.shareService.setMyCompetenze(this.searchCompetenze)
    this.shareService.setOtherCompetenze(this.allCompetenze)
    let obj = {page: false};
    let myModal = this.modalCtrl.create(TabsPage,obj);
    myModal.present();

    myModal.onDidDismiss(data => {

        this.searchCompetenze = this.shareService.getMyCompetenze();
        this.allCompetenze = this.shareService.getOtherCompetenze()


  });

  }

}


























































//  this.vaccini(this.result); line 77

/*  vaccini(res){
     console.log("vaccini",this.result.length);
     console.log("vaccini",this.result);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });

  }*/
