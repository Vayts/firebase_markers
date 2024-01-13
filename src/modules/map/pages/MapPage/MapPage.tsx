import React from 'react';
import MapElem from '@modules/map/components/MapElem/MapElem';
import Sidebar from '@modules/map/components/Sidebar/Sidebar';

const MapPage: React.FC = () => {
  const mapRef = React.useRef<google.maps.Map>(null);
  
  return (
    <div>
      <Sidebar mapRef={mapRef}/>
      <MapElem mapRef={mapRef}/>
    </div>
  );
};

export default MapPage;
