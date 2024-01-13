import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { DEFAULT_MAP_THEME } from '@modules/map/constants/map-style';
import { useAppDispatch, useAppSelector } from '@src/shared/hooks/redux';
import { addMarker, getMarkers } from '@modules/map/redux/thunks';
import MarkerElem from '@modules/map/components/MarkerElem/MarkerElem';
import { MapElemProps } from '@modules/map/components/MapElem/types';
import * as process from 'process';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 48.435345343,
  lng: 38.12312312312,
};

const defaultOptions = {
  styles: DEFAULT_MAP_THEME,
  mapTypeControl: true,
  clickableIcons: false,
  fullscreenControl: false,
  mapTypeControlOptions: {
    position: 7.0,
  },
  minZoom: 3,
};

const MapElem: React.FC<MapElemProps> = ({ mapRef }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  const isAdding = useAppSelector((state) => state.map.isAdding);
  const markers = useAppSelector((state) => state.map.markers);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getMarkers());
  }, []);
  
  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  const clickHandler = (e: google.maps.MapMouseEvent) => {
    if (!isAdding) {
      dispatch(addMarker({
        lng: e.latLng.lng(),
        lat: e.latLng.lat(),
      }));
    }
  };
  
  return isLoaded ? (
    <GoogleMap
      zoom={11}
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onClick={clickHandler}
      options={defaultOptions}
    >
      {markers.map((marker, index) => {
        return (
          <MarkerElem
            index={index + 1}
            marker={marker}
            key={marker.id}
          />
        );
      })}
    </GoogleMap>
  ) : <></>;
};

export default MapElem;
