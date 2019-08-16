import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation,
  LatLng
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  map: GoogleMap;
  marker: Marker;
  @Input()
  latLng: LatLng = null;
  @Output()
  locationChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if (this.latLng === null) {
      this.loadMap();
    } else {

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadMapAtInputLocation(changes.latLng.currentValue);
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
    this.locationChange.emit(latLng);
  }

  loadMapAtInputLocation(latLng) {
    if (this.map !== undefined && this.map !== null) {
      this.map.remove();
    }
    if (this.marker !== undefined && this.marker !== null) {
      this.marker.remove();
    }

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDE6vwyjr_HUlyzP6EU4rsNxd_xchtBA1o',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDE6vwyjr_HUlyzP6EU4rsNxd_xchtBA1o'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: latLng,
        zoom: 18,
        tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }
}
