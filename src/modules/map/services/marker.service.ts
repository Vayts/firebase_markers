import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@shared/utils/firebase';
import { MapMarker } from '@modules/map/types/marker.types';
import { v4 as uuidv4 } from 'uuid';
import { UpdateCreateMarkerDto } from '@modules/map/dto/update-create-marker.dto';
import { generatePathFromMarkers, generatePathToMarker, getMarkersAfterTarget } from '@modules/map/utils/marker.helper';

export class MarkerService {
  async getAllDocumentsInCollection(documents: MapMarker[] = [], path: string[]): Promise<MapMarker[]> {
    const collectionRef = collection(db, 'markers', ...path);
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs[0];
    if (data) {
      documents.push({
        ...data.data(),
        id: data.id,
      } as MapMarker);
      
      return this.getAllDocumentsInCollection(documents, [...path, data.id, 'next']);
    }
    return documents;
  }
  
  async getMarkers(): Promise<MapMarker[]> {
    return await this.getAllDocumentsInCollection([], []);
  }
  
  async updateMarkers(values: UpdateCreateMarkerDto, id: string, markers: MapMarker[]): Promise<void> {
    const path = generatePathToMarker(markers, id);
    
    await updateDoc(doc(db, 'markers', ...path, id), {
      ...values,
    });
  }
  
  async addMarker(values: UpdateCreateMarkerDto, markers: MapMarker[]) {
    const id = uuidv4();
    const markerData: MapMarker = {
      ...values,
      timestamp: Date.now(),
    };

    if (!markers.length) {
      await setDoc(doc(db, 'markers', id), markerData);
      return {
        ...markerData,
        id,
      };
    }
    
    const path = generatePathFromMarkers(markers);

    await setDoc(doc(db, 'markers', ...path, id), markerData);
    
    return {
      ...markerData,
      id,
    };
  }
  
  async deleteMarker(markers: MapMarker[], id: string): Promise<void> {
    const prevMarkerPath = generatePathToMarker(markers, id);
    const markersToSave = getMarkersAfterTarget(markers, id);
    const markersToDeleteIds = markersToSave.map((item) => item.id);
    
    if (markersToDeleteIds.length) {
      await this.deleteMultipleMarkers(markersToDeleteIds, markers);
    }
    
    await deleteDoc(doc(db, 'markers', ...prevMarkerPath, id));
    
    if (markersToSave.length) {
      await this.addMultipleMarkers(markersToSave, prevMarkerPath);
    }
  }
  
  async deleteMultipleMarkers(markersToDelete: string[], allMarkers: MapMarker[]): Promise<[]> {
    const markerId = markersToDelete.pop();
    const path = generatePathToMarker(allMarkers, markerId);

    await deleteDoc(doc(db, 'markers', ...path, markerId));

    if (markersToDelete.length) {
      await this.deleteMultipleMarkers(markersToDelete, allMarkers);
    } else {
      return [];
    }
  }
  
  async addMultipleMarkers(markers: MapMarker[], pathArr: string[]): Promise<[]> {
    const marker = markers.shift();
    const dto = new UpdateCreateMarkerDto(marker);
    
    await setDoc(doc(db, 'markers', ...pathArr, marker.id), { ...dto, timestamp: marker.timestamp });
    
    if (markers.length) {
      pathArr.push(marker.id, 'next');
      await this.addMultipleMarkers(markers, pathArr);
    } else {
      return [];
    }
  }
}
