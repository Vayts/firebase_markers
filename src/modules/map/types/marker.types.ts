export interface RawMapMarker {
  lat: number,
  lng: number,
}

export interface MapMarker {
  id?: string,
  lat: number,
  lng: number,
  timestamp: number,
}
