import { LocationService } from './../../services/location.service';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { StoreDTO } from 'src/app/api/models';
import { Storage } from '@ionic/storage';
import {
  LatLng,
  Environment,
  GoogleMapOptions,
  GoogleMaps,
  MyLocation,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  GoogleMap,
  Marker } from '@ionic-native/google-maps';
import { Util } from 'src/app/services/util';

@Component({
  selector: 'app-restaurant-location',
  templateUrl: './restaurant-location.page.html',
  styleUrls: ['./restaurant-location.page.scss'],
})
export class RestaurantLocationPage implements OnInit {

  store: StoreDTO;
  places: any[] = [];
  map: GoogleMap;
  marker: Marker;
  selectedLocation: LatLng = null;
  constructor(
    private queryService: QueryResourceService,
    private storage: Storage,
    private locationService: LocationService,
    private util: Util,
    private commandResource: CommandResourceService,
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      user => {
        this.queryService.findStoreDTOByRegNoUsingGET(user.preferred_username).subscribe(
          res => {
            this.store = res;
            this.loadMap();
          }
        );
      }
    );
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBdjkfcPlWTwnUq1W1YLIXMNJtMjdOXVXk',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyBdjkfcPlWTwnUq1W1YLIXMNJtMjdOXVXk'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.addEvent();
    if (this.store.location !== null && this.store.location.length > 0) {
      const latLnArr = this.store.location.split(',');
      this.selectedLocation = new LatLng(parseFloat(latLnArr[0]), parseFloat(latLnArr[1]));
      return this.loadNewMap();
    }

    this.map.getMyLocation().then((location: MyLocation) => {
      this.map.animateCamera({
        target: location.latLng,
        zoom: 14,
        tilt: 30
      });
      this.map.addMarkerSync({
        position: location.latLng,
        animation: GoogleMapsAnimation.DROP
      });
    }).catch(err => {
      console.log(err.error_message);
    });
    this.addEvent();
  }

  addEvent() {
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res => {
        this.moveMarker(res[0]);
      }
    );
  }

  moveMarker(latLng: LatLng) {
    this.map.clear().then( () => {
      this.map.addMarkerSync({
        position: latLng,
        animation: GoogleMapsAnimation.DROP
      });
    });
    this.selectedLocation = latLng;
    this.store.location = latLng.lat + ',' + latLng.lng;
  }

  searchLocation(event) {
    const searchterm = event.detail.value;
    this.places = [];
    if (searchterm === '' || searchterm === null) {
      return;
    }
    this.locationService.getPredictions(searchterm).subscribe(res => {
      this.places = res;
    });
  }

  selectPlace(place) {
    this.places = [];
    this.locationService.geocodeAddress(place.place_id).then(data => {
      this.selectedLocation = new LatLng(data[0], data[1]);
      this.store.location = this.selectedLocation.lat + ',' + this.selectedLocation.lng;
      this.loadNewMap();
    }).catch(err => {
      this.util.createToast('Error can\'t change place');
    });
  }

  loadNewMap() {
    this.moveMarker(this.selectedLocation);
    this.map.animateCamera({
      target: this.selectedLocation,
        zoom: 14,
        tilt: 30
    });
  }

  saveStore() {
    this.commandResource.updateStoreUsingPUT(this.store).subscribe(
      res => {
        this.util.createToast('Location changed', 'done-all');
      },
      err => {
        this.util.createToast('Couldn\'t reach the servers, try again');
      }
    );
  }
}
