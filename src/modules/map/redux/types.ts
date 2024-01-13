import { MapMarker } from '@modules/map/types/marker.types';

export interface MapState {
  isLoading: boolean,
  isDeleting: boolean,
  isAdding: boolean,
  markers: MapMarker[],
}
