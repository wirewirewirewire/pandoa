export const getCurrentStore = (state, ownProps) =>
  state.reducer.stores.find(e => e.client_id === ownProps.route.item);

export const getAllPositions = state => state.positions;
// state.positions.filter(point => point.data);

export const getAllWarnings = state => state.warnings;

export const getAllTracks = state =>
  Array.isArray(state.infections) ? state.infections : [];
export const countTracks = state => state.infections.length;

export const countPositions = state => state.positions.length;
