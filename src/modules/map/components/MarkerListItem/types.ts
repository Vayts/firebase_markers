import { MapMarker } from '@modules/map/types/marker.types';

export interface MarkerListItemProps {
  marker: MapMarker,
  index: number,
  onClick: (lat: number, lng: number) => void,
}
