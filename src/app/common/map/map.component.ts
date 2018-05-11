import { Component, Input } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() location: string;

  isPositionLoaded: boolean = false;
  isPositionError: boolean = false;
  
  lat: number;
  lng: number;

  constructor(private mapService: MapService) { }

  mapReadyHandler() {
  
  	this.mapService.getGeoLocation(this.location).subscribe(
  		(coordinates) => {
  			this.lat = coordinates.lat;
  			this.lng = coordinates.lng;

  			this.isPositionLoaded = true;
  			
  		}, (error) => {
			this.isPositionLoaded = true;
			this.isPositionError = true;
  		})
  }

}
