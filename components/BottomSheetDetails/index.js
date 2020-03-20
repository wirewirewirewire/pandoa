import React, { Component } from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import { Button, Icon, StyleProvider, Text } from "native-base";
import variable from "../../native-base-theme/variables/platform";
import HistoryList from "../HistoryList";

{
  /*import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faCog,
  faPlay,
  faQuestion
} from "@fortawesome/pro-regular-svg-icons";*/
}

class BottomSheetDetails extends Component {
  render() {
    const {
      currentDeviceData,
      currentDeviceLastGpsStores,
      bottomSheetRef,
      contentPosition,
      toggleDetails
    } = this.props;

    const renderInnerDetails = () => {
      console.log("currentDeviceLastGpsStores", currentDeviceLastGpsStores);
      return (
        <View style={styles.panelInner}>
          <HistoryList />
        </View>
      );
    };
    const renderInnerHeader = () => {
      return (
        <View style={styles.headerInner}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
          <Text style={styles.panelTitle}>History</Text>
        </View>
      );
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        contentPosition={contentPosition}
        snapPoints={[60, 238, 600]}
        renderContent={renderInnerDetails}
        renderHeader={renderInnerHeader}
      />
    );
  }
}
export const styles = StyleSheet.create({
  panelInner: {
    position: "relative",
    zIndex: 30,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  headerInner: {
    zIndex: -10,
    position: "relative",
    backgroundColor: "#ffffff",
    paddingTop: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE3E6",
    paddingLeft: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5
  },
  panelHeader: {
    alignItems: "center",
    display: "flex"
  },
  panelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 3
  },
  panelTitle: {
    fontSize: 22,
    height: 35,
    fontWeight: "bold"
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10
  }
});

export default BottomSheetDetails;
