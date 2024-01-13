import { RawMapMarker } from '@modules/map/types/marker.types';

export class UpdateCreateMarkerDto {
  readonly lat: number;
  
  readonly lng: number;
  
  constructor(values: RawMapMarker) {
    this.lat = values.lat;
    this.lng = values.lng;
  }
}
