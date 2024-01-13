import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import MarkerListItem from '@modules/map/components/MarkerListItem/MarkerListItem';
import { SidebarProps } from '@modules/map/components/Sidebar/types';
import { clearMarkersList } from '@modules/map/redux/thunks';
import Loader from '@components/Loader/Loader';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC<SidebarProps> = ({ mapRef }) => {
  const isLoading = useAppSelector((state) => state.map.isLoading);
  const isDeleting = useAppSelector((state) => state.map.isDeleting);
  const markers = useAppSelector((state) => state.map.markers);
  const dispatch = useAppDispatch();
  
  const moveToCoords = useCallback((lat: number, lng: number) => {
    mapRef.current.panTo({ lat, lng });
  }, []);
  
  const handleClearMarkers = () => {
    dispatch(clearMarkersList());
  };
  
  return (
    <div className={styles.SidebarWrapper}>
      {
        isLoading || isDeleting && (
          <div className={styles.SidebarLoader}>
            <Loader />
          </div>
        )
      }
      
      <h3 className={styles.SidebarTitle}>Marker list</h3>
      <span className={styles.SidebarClearButton} onClick={handleClearMarkers}>Clear</span>
      
      <ul className={styles.MarkersList}>
        {markers.map((marker, index) => {
          return (
            <React.Fragment key={marker.id}>
              <MarkerListItem marker={marker} index={index} onClick={moveToCoords}/>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
