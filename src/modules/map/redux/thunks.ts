import { createAsyncThunk } from '@reduxjs/toolkit';
import { RawMapMarker } from '@modules/map/types/marker.types';
import { updateMarkerCoords } from '@modules/map/redux/slice';
import { MarkerService } from '@modules/map/services/marker.service';
import { UpdateCreateMarkerDto } from '@modules/map/dto/update-create-marker.dto';
import { RootState } from '@src/store';

const MODULE_NAME = 'map';
const markerService = new MarkerService();

export const getMarkers = createAsyncThunk(
  `${MODULE_NAME}/getMarkers`,
  async (_, { rejectWithValue }) => {
    try {
      return await markerService.getMarkers();
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);

export const addMarker = createAsyncThunk(
  `${MODULE_NAME}/addMarker`,
  async (values: RawMapMarker, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      
      const dto = new UpdateCreateMarkerDto(values);
      return await markerService.addMarker(dto, state.map.markers);
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);

export const deleteMarker = createAsyncThunk(
  `${MODULE_NAME}/deleteMarker`,
  async (id: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    
    try {
      await markerService.deleteMarker(state.map.markers, id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);

export const updateMarker = createAsyncThunk(
  `${MODULE_NAME}/updateMarker`,
  async ({ values, id }: {values: RawMapMarker, id: string}, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    
    try {
      dispatch(updateMarkerCoords({
        id,
        values,
      }));

      await markerService.updateMarkers(values, id, state.map.markers);
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);

export const clearMarkersList = createAsyncThunk(
  `${MODULE_NAME}/clearMarkersList`,
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    
    if (!state.map.markers.length) {
      return [];
    }
    
    try {
      const markersToDeleteIds = state.map.markers.map((item) => item.id);
      
      await markerService.deleteMultipleMarkers(markersToDeleteIds, state.map.markers);
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);
