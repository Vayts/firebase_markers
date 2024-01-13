import React from 'react';
import MapPage from '@modules/map/pages/MapPage/MapPage';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <MapPage/>
    </div>
  );
};
