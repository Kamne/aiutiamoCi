import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 Spherical,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Events } from 'ionic-angular';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()



@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lat:number
  lng:number
  street:string
  map:any



  @ViewChild('map') element;

  constructor(public event:Events,public googleMaps: GoogleMaps, public alertCtrl: AlertController, public plt: Platform, public nav: NavController, geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
    plt.ready().then(() => {
      console.log("piattaforma pronta");

      geolocation.getCurrentPosition().then((location) => {

            this.lat = location.coords.latitude
            this.lng = location.coords.longitude
            console.log("lat:"+this.lat,"lng:"+this.lng)
            this.initMap()
  console.log(location);

}).catch((error) => {

  console.log('Error getting location', error);

});
});
  }



 initMap() {
   console.log("sto creando la mappa");
  let map: GoogleMap = GoogleMaps.create(this.element.nativeElement);
  this.map = map
  map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
    let coordinates: LatLng = new LatLng(this.lat, this.lng);
    this.nativeGeocoder.reverseGeocode(this.lat, this.lng).then((result: NativeGeocoderReverseResult) => {
      if(result.subThoroughfare != undefined)
        this.street = result.thoroughfare+" "+result.subThoroughfare+","+result.locality+","+result.subAdministrativeArea.split("-")[0].split(" ")[result.subAdministrativeArea.split("-")[0].split(" ").length-1]
      else
        this.street = result.thoroughfare+","+result.locality+","+result.subAdministrativeArea.split(" ")[result.subAdministrativeArea.split(" ").length-1]
      this.createMarker(coordinates,map,this.street)
  console.log(result.subAdministrativeArea.split("-")[0]);
  console.log(result.countryName);
})
    console.log("coords:"+this.lat +" " + this.lng)
    let position = {
      target: coordinates,
      zoom: 17
    };
    console.log("aiutatm")
    map.animateCamera(position);


  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }


createMarker(coordinates,map,street){
  console.log("create marker "+coordinates)
  let markerOptions: MarkerOptions = {
    position: coordinates,
    icon: "assets/images/icons8-Marker-64.png",
    title: street
  };
  map.clear();
  const marker = map.addMarker(markerOptions)
    .then((marker: Marker) => {
      marker.showInfoWindow();
  });

  let position = {
    target: coordinates,
    zoom: 17
  };

  map.animateCamera(position);

}

  conferma(){
    this.event.publish('maps', this.street.split(","));
    this.nav.pop();
  }

  modifica() {
    let alert = this.alertCtrl.create({
      title: 'Modifica indirizzo',
      cssClass:"alert",
      inputs: [
        {
          name: 'indirizzo',
          placeholder: 'Indirizzo'
        },
        {
          name: 'citta',
          placeholder: 'citta'
        }
      ],

      buttons: ['Annulla' ,
      {
        text: 'Conferma',
        handler: data => {
            this.findMarker(data.indirizzo,data.citta,this.map);
        }
      }]
    });
    alert.present();
  }

  findMarker(findPosition,citta,map) {
    console.log(""+findPosition)
    this.nativeGeocoder.forwardGeocode(findPosition+","+citta)
      .then((coordinates: NativeGeocoderForwardResult) =>{
        console.log("sto qua")
        var lat = Number(coordinates.latitude);
        var lng = Number(coordinates.longitude);
        console.log(""+lat);
        let coordinate: LatLng = new LatLng(lat,lng);
        console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
        this.street = ""
        this.nativeGeocoder.reverseGeocode(lat,lng).then((result: NativeGeocoderReverseResult) => {
          if(result.thoroughfare != undefined)
            this.street = this.street + result.thoroughfare;
          if(result.subThoroughfare != undefined)
            this.street = this.street+" "+result.subThoroughfare
            if(result.locality != undefined)
              this.street = this.street + ","+ result.locality;
              if(result.subAdministrativeArea != undefined)
                this.street = this.street + ","+ result.subAdministrativeArea.split(" ")[result.subAdministrativeArea.split(" ").length-1];

          this.createMarker(coordinate,map,this.street)
      console.log(result);
      console.log(result.countryName);
    })


      })
      .catch((error: any) => console.log(error));
  }



}
