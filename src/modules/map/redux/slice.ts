import { createSlice } from '@reduxjs/toolkit';
import { MapState } from '@modules/map/redux/types';
import { addMarker, clearMarkersList, deleteMarker, getMarkers } from '@modules/map/redux/thunks';

const initialState: MapState = {
  markers: [],
  isLoading: true,
  isDeleting: false,
  isAdding: false,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateMarkerCoords: (state, { payload }) => {
      state.markers = state.markers.map((doc) => {
        if (doc.id === payload.id) {
          return {
            ...doc,
            ...payload.values,
          };
        }
        return doc;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarkers.fulfilled, (state, { payload }) => {
        state.markers = payload;
        state.isLoading = false;
      })
      .addCase(addMarker.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addMarker.rejected, (state) => {
        state.isAdding = false;
      })
      .addCase(addMarker.fulfilled, (state, { payload }) => {
        state.markers = [...state.markers, payload];
        state.isAdding = false;
      })
      .addCase(deleteMarker.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteMarker.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteMarker.fulfilled, (state, { payload }) => {
        state.markers = state.markers.filter((doc) => doc.id !== payload);
        state.isDeleting = false;
      })
      .addCase(clearMarkersList.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(clearMarkersList.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(clearMarkersList.fulfilled, (state) => {
        state.markers = [];
        state.isDeleting = false;
      });
  },
});

export const { updateMarkerCoords } = mapSlice.actions;
