import React from 'react';
import { Marker } from '@react-google-maps/api';
import { MapMarker } from '@modules/map/types/marker.types';
import { useAppDispatch } from '@shared/hooks/redux';
import { updateMarker } from '@modules/map/redux/thunks';

type Props = {
  marker: MapMarker,
  index: number,
}

const MarkerElem: React.FC<Props> = ({ marker, index }) => {
  const dispatch = useAppDispatch();
  
  const handleDrag = (e: google.maps.MapMouseEvent) => {
    dispatch(updateMarker(
      { values: {
        lng: e.latLng.lng(),
        lat: e.latLng.lat(),
      },
      id: marker.id }),
    );
  };
  
  return (
    <Marker
      position={{ lat: marker.lat, lng: marker.lng }}
      draggable
      label={index.toString()}
      onDragEnd={handleDrag}
    />
  );
};

export default MarkerElem;
