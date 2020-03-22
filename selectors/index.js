export const getCurrentStore = (state, ownProps) =>
  state.reducer.stores.find(e => e.client_id === ownProps.route.item);

export const getAllPositions = state => state.positions;
// state.positions.filter(point => point.data);

export const getAllWarnings = state => state.warnings;
export const getDetail = state => state.detail;
export const getAllTracks = state =>
  Array.isArray(state.infections) ? state.infections : [];
export const countTracks = state => state.infections.length;

export const countPositions = state => state.positions.length;
export const countWarnings = state => state.warnings.length;
export const getCase = state => state.caseRed;

export const getWarning = state => state.warnings[state.detail];

export const getAllFilteredWarnings = state => {
  const filteredWarnings = state.warnings.filter(
    e => e.matches && e.matches.length >= 1
  );
  return filteredWarnings;
};

export const countFilteredWarnings = state => {
  const filteredWarnings = state.warnings.filter(
    e => e.matches && e.matches.length >= 1
  );
  return filteredWarnings.length;
};
