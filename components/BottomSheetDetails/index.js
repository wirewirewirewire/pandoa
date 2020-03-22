import React, { Component } from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import { Button, Icon, StyleProvider, Text } from "native-base";
import variable from "../../native-base-theme/variables/platform";
import WarningList from "../WarningList";

class BottomSheetDetails extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
  }

  //TODO: improve implementation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== false) {
      setTimeout(() => {
        this.bottomSheetRef.current.snapTo(0);
      }, 200);
    } else {
      setTimeout(() => {
        this.bottomSheetRef.current.snapTo(1);
      }, 200);
    }
  }

  render() {
    const { contentPosition, setDetail, navigation } = this.props;

    const renderInnerDetails = () => {
      return (
        <View style={styles.panelInner}>
          <WarningList navigation={navigation} />
        </View>
      );
    };
    const renderInnerHeader = () => {
      return (
        <View style={styles.headerInner}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
          <Text style={styles.panelTitle}>Warnings</Text>
        </View>
      );
    };

    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        contentPosition={contentPosition}
        snapPoints={[58, 238, 600]}
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
    backgroundColor: "#ffffff",
    minHeight: 540
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
