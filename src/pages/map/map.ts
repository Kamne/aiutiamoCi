import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
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
  map:any

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

  detail(event) {
this.map.clear()
console.log(event)
this.nativeGeocoder.forwardGeocode(event.description)
  .then((coordinates: NativeGeocoderForwardResult) =>{
    let coordinate: LatLng = new LatLng(Number(coordinates.latitude),Number(coordinates.longitude));
    let position = {
      target: coordinate,
      zoom: 17
    };
    this.map.animateCamera(position);
      this.createMarker(coordinate,this.map,event.description)
     console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
     console.log("position value :"+position)

   })


  .catch((error: any) => console.log("OMG "+error));

 }

 initMap() {

  let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);
  this.map = map
  map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {



    let coordinates: LatLng = new LatLng(this.lat, this.lng);
    this.nativeGeocoder.reverseGeocode(this.lat, this.lng).then((result: NativeGeocoderReverseResult) => {
      this.street = result.thoroughfare+","+result.locality
      this.createMarker(coordinates,map,this.street)
  console.log(result);
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
createMarker(coordinates,map,street){
  let markerOptions: MarkerOptions = {
    position: coordinates,
    icon: "assets/images/icons8-Marker-64.png",
    title: street
  };

  const marker = map.addMarker(markerOptions)
    .then((marker: Marker) => {
      marker.showInfoWindow();
  });
}
}
