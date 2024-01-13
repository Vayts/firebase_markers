import React, { memo } from 'react';
import { MarkerListItemProps } from '@modules/map/components/MarkerListItem/types';
import { useAppDispatch } from '@shared/hooks/redux';
import { deleteMarker } from '@modules/map/redux/thunks';
import { format } from 'date-fns';
import styles from './MarkerListItem.module.scss';

const MarkerListItem: React.FC<MarkerListItemProps> = ({ marker, index, onClick }) => {
  const dispatch = useAppDispatch();
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteMarker(marker.id));
  };
  
  const handleClick = () => {
    onClick(marker.lat, marker.lng);
  };
  
  return (
    <li className={styles.MarkerItemWrapper} onClick={handleClick}>
      <span className='icon-marker'/>
      <div className={styles.MarkerContent}>
        <h4 className={styles.MarkerTitle}>{`Quest #${index + 1}`}</h4>
        <ul className={styles.MarkerInfoList}>
          <li>
            <span>lat: </span>
            <span>{marker.lat}</span>
          </li>
          <li>
            <span>lng: </span>
            <span>{marker.lng}</span>
          </li>
          <li>
            <span>time: </span>
            <span>{format(new Date(marker.timestamp), 'HH:mm:ss dd/MM/yyyy')}</span>
          </li>
        </ul>
      </div>
      <div className={styles.MarkerButtonWrapper}>
        <span className='icon-delete' onClick={handleDelete}/>
      </div>
    </li>
  );
};

export default memo(MarkerListItem);
