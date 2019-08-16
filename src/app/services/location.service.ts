import { Injectable, NgZone } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { MapsAPILoader, GoogleMapsAPIWrapper } from "@agm/core";
import { Observable } from "rxjs";
import { LatLng } from "@ionic-native/google-maps";

declare var google: any;

@Injectable({
  providedIn: "root"
})
export class LocationService {
  autoCompleteService: any;

  private currentLat: number;
  private currentLon: number;
  private geocoder: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private geolocation: Geolocation
  ) {
    this.mapsAPILoader.load().then(() => {
      this.autoCompleteService = new google.maps.places.AutocompleteService();
    });
  }

  calculateDistance(from: any, to: any): number {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      from,
      to
    );
    return distance;
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition();
  }

  getPredictions(searchTerm: string): Observable<any[]> {
    return new Observable(observer => {
      this.autoCompleteService.getPlacePredictions(
        { input: searchTerm },
        data => {
          let previousData: Array<any[]>;
          if (data) {
            previousData = data;
            observer.next(data);
            observer.complete();
          }

          if (!data) {
            observer.next(previousData);
            observer.complete();
          } else {
            observer.error(status);
          }
        }
      );
    });
  }

  async geocodeAddress(placeId: string): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      let latlon: number[];
      this.geocoder = new google.maps.Geocoder();
      this.geocoder.geocode({ placeId }, async (results, status) => {
        if (status !== "OK") {
          return;
        }
        latlon = [
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
        ];
        resolve(latlon);
      });
    });
  }

  async getCurrentLoactionAddress(func) {
    return this.getCurrentLocation().then(data => {
      const latLng = data.coords.latitude + "," + data.coords.longitude;
      this.mapsAPILoader.load().then(() => {
        const googleMapPos = new google.maps.LatLng(
          data.coords.latitude,
          data.coords.longitude
        );
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({ latLng: googleMapPos }, (results, status) => {
          func(results, data);
        });
      });
    });
  }

  async reverseGeoCode(latLng: LatLng, func) {
    this.mapsAPILoader.load().then(() => {
      const googleMapPos = new google.maps.LatLng(latLng.lat, latLng.lng);
      this.geocoder = new google.maps.Geocoder();
      this.geocoder.geocode({ latLng: googleMapPos }, (results, status) => {
        func(results[0].address_components[0].short_name);
      });
    });
  }
}
