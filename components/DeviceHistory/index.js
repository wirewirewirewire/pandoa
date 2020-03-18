import React from "react";
import { connect } from "react-redux";
import HistoryFilter from "./HistoryFilter";
import HistoryTable from "./HistoryTable";
import Empty from "../Empty";
//import { InlineLoading } from "@wfp/ui";
//import './_history.scss';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const DeviceOverview = props => {
  const { fetching, currentDevice, lastGpsStores } = props;

  if (currentDevice.length === 1) {
    return (
      <React.Fragment>
        <React.Fragment>
          <View>
            <HistoryFilter />
          </View>
        </React.Fragment>
        {fetching ? <View /> : <HistoryTable lastGpsStores={lastGpsStores} />}
      </React.Fragment>
    );
  }
  return (
    <View kind="large" title="No history">
      Select a device to see the history
    </View>
  );
};

const mapStateToProps = state => {
  return {
    fetching: state.reducer.fetching,
    devices: state.reducer.devices,
    stores: state.reducer.stores,
    error: state.reducer.error,
    lastStores: state.reducer.lastStores,
    lastGpsStores: state.reducer.lastGpsStores,
    currentDevice: state.reducer.currentDevice
  };
};

export default connect(mapStateToProps)(DeviceOverview);
