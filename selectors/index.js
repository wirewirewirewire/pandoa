import { createSelector } from "reselect";

const getVisibilityFilter = state => state.visibilityFilter;
const getStores = state => state.reducer.stores;
const getChangesCount = state => state.reducer.changes;

export const getLastYearStore = createSelector(
  [getStores, getChangesCount],
  (stores, changes) => {
    const lastYears = stores.filter(store => store.model === "year");

    if (lastYears.length === 0) return null;

    const lastYearData = lastYears.reduce((max, store) =>
      max.date > store.date ? max : store
    );
    return lastYearData;
  }
);

export const getCurrentStore = (state, ownProps) =>
  state.reducer.stores.find(e => e.client_id === ownProps.route.item);

export const getAllPositions = state => state.positions;
// state.positions.filter(point => point.data);

export const getAllWarnings = state => state.warnings;

export const getAllTracks = state =>
  Array.isArray(state.infections) ? state.infections : [];
export const countTracks = state => state.infections.length;
