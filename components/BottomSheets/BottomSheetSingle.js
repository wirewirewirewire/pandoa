import React, { Component } from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import { Button, Icon, StyleProvider, Text } from "native-base";
import variable from "../../native-base-theme/variables/platform";
import WarningList from "../WarningList";
import { connect } from "react-redux";
import { getAllWarnings, getDetail } from "../../selectors";
import { setDetail } from "../../actions";

class BottomSheetSingle extends Component {
  render() {
    const {
      currentDeviceLastGpsStores,
      bottomSheetRef,
      contentPosition,
      detail,
      setDetailTrigger,
      navigation
    } = this.props;

    const renderInnerDetails = () => {
      console.log("currentDeviceLastGpsStores", currentDeviceLastGpsStores);
      return <View style={styles.panelInner}></View>;
    };
    const renderInnerHeader = () => {
      return (
        <View style={styles.headerInner}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
          <Button onPress={() => setDetailTrigger(false)}>
            <Text>Closen</Text>
          </Button>
          <Text style={styles.panelTitle}>Detail</Text>
        </View>
      );
    };

    return (
      <View style={{ background: "red", opacity: detail ? 0.1 : 0.3 }}>
        <BottomSheet
          ref={bottomSheetRef}
          initialSnap={0}
          contentPosition={contentPosition}
          snapPoints={[0, 238, 600]}
          renderContent={renderInnerDetails}
          renderHeader={renderInnerHeader}
        />
      </View>
    );
  }
}
export const styles = StyleSheet.create({
  panelInner: {
    position: "relative",
    zIndex: 30,
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

const mapStateToProps = state => {
  return {
    detail: getDetail(state),
    warnings: getAllWarnings(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setDetailTrigger: id => dispatch(setDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheetSingle);
