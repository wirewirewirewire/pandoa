import {
  API_CALL_INFECTIONS_REQUEST,
  API_CALL_INFECTIONS_SUCCESS,
  API_CALL_INFECTIONS_FAILURE,
  GENERATE_FAKE_INFECTIONS
} from "../constants/ActionTypes";

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case API_CALL_INFECTIONS_REQUEST:
      return state; //{ ...state, fetching: true, error: null };
    case API_CALL_INFECTIONS_SUCCESS:
      return [...action.data];
    case API_CALL_INFECTIONS_FAILURE:
      return [];
    case GENERATE_FAKE_INFECTIONS:
      if (action.data === undefined) return [];
      const fakeData = [];
      for (let index = 0; index < 300; index++) {
        const oldDate = new Date(Date.parse(action.data.time));
        fakeData.push({
          lat: action.data.lat + Math.random() * (0.01 - -0.01) + -0.01,
          lng: action.data.lng + +Math.random() * (0.01 - -0.01) + -0.01,
          time: new Date(oldDate.getTime() + Math.random() * 6000000)
        });
      }
      return fakeData;
    default:
      return state;
  }
}
