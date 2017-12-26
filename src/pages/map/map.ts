import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
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
  street: string

  @ViewChild('map') element;

  constructor(public googleMaps: GoogleMaps, public plt: Platform, public nav: NavController, geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
    plt.ready().then(() => {
      geolocation.getCurrentPosition().then((location) => {
            this.lat = location.coords.latitude
            this.lng = location.coords.longitude
            this.initMap()
  console.log(location);

}).catch((error) => {

  console.log('Error getting location', error);

});
});
  }

  /*ngAfterViewInit() {
   this.plt.ready().then(() => {
     this.initMap();
   });
 }*/

 initMap() {

  let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

  map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

    let coordinates: LatLng = new LatLng(this.lat, this.lng);
    this.nativeGeocoder.reverseGeocode(this.lat, this.lng).then((result: NativeGeocoderReverseResult) => {
      this.street = result.thoroughfare+" "+result.subThoroughfare
      this.createMarker(coordinates,map)
  console.log(result.thoroughfare);
  console.log(result.countryName);
})
    console.log("coords:"+this.lat +" " + this.lng)
    let position = {
      target: coordinates,
      zoom: 17
    };

    map.animateCamera(position);


  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
createMarker(coordinates,map){
  let markerOptions: MarkerOptions = {
    position: coordinates,
    icon: "assets/images/icons8-Marker-64.png",
    title: this.street
  };

  const marker = map.addMarker(markerOptions)
    .then((marker: Marker) => {
      marker.showInfoWindow();
  });
}
}
