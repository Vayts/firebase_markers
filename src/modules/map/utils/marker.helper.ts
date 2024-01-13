import { MapMarker } from '@modules/map/types/marker.types';

export function generatePathFromMarkers(markers: MapMarker[]): string[] {
  const path: string[] = [];
  
  markers.forEach((item) => {
    path.push(item.id, 'next');
  });
  
  return path;
}

export function generatePathToMarker(markers: MapMarker[], id: string): string[] {
  const path: string[] = [];
  
  if (markers[0].id === id) {
    return [];
  }
  
  for (let i = 0; i < markers.length; i += 1) {
    if (markers[i].id !== id) {
      path.push(markers[i].id, 'next');
    } else {
      break;
    }
  }
  
  return path;
}

export function getMarkersAfterTarget(markers: MapMarker[], id: string): MapMarker[] {
  const index = markers.findIndex((item) => item.id === id);
  return markers.slice(index + 1, markers.length);
}
