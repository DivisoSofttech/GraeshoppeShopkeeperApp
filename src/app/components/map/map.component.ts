import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: GoogleMap;
  marker: Marker;
  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDE6vwyjr_HUlyzP6EU4rsNxd_xchtBA1o',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDE6vwyjr_HUlyzP6EU4rsNxd_xchtBA1o'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.getMyLocation().then((location: MyLocation) => {
      this.map.animateCamera({
        target: location.latLng,
        zoom: 14,
        tilt: 30
      });
      this.marker = this.map.addMarkerSync({
        position: location.latLng,
        animation: GoogleMapsAnimation.DROP
      });
    }).catch(err => {
      console.log(err.error_message);
    });

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res => {
        console.log(res);
        this.moveMarker(res[0]);
      }
    );
  }

  moveMarker(latLng) {
    this.marker.remove();
    this.marker = this.map.addMarkerSync({
      position: latLng,
      animation: GoogleMapsAnimation.DROP
    });
  }
}
