import React, { Component } from "react";

import {
  Switch,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import { Button, Icon, StyleProvider, Text } from "native-base";
import { connect } from "react-redux";
import WarningList from "./WarningList";
import LargeButton from "./LargeButton";
import { countFilteredWarnings } from "../selectors";
import { Ionicons } from "@expo/vector-icons";

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

  toggleSwitch = () => {};

  render() {
    const { contentPosition, filteredWarnings, navigation } = this.props;

    const renderInnerDetails = () => {
      return (
        <View style={styles.panelInner}>
          <View style={styles.buttonWrapper}>
            <LargeButton>
              <Text>Enable tracking</Text>
              <Switch onValueChange={this.toggleSwitch} value={true} />
            </LargeButton>
          </View>
          <View style={styles.buttonWrapper}>
            <LargeButton>
              <Text>Import </Text>
            </LargeButton>
            <LargeButton>
              <Text>Export</Text>
            </LargeButton>
          </View>
          <View style={styles.buttonWrapper}>
            <LargeButton>
              <Text>Remove points</Text>
            </LargeButton>
          </View>
        </View>
      );
    };
    const renderInnerHeader = () => {
      return (
        <>
          <View style={styles.headerShadow} />
          <View style={styles.headerInner}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
            </View>
            <View style={styles.panelTitleWrapper}>
              <Text style={styles.panelTitle}>Me</Text>

              <Button rounded small style={styles.buttonUpdate}>
                <Ionicons
                  style={styles.buttonUpdateIcon}
                  name="md-refresh"
                  size={19}
                  color="#fff"
                />
                <Text style={styles.buttonUpdateText}>Update</Text>
              </Button>
            </View>
          </View>
        </>
      );
    };

    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        contentPosition={contentPosition}
        snapPoints={[65, 238, 600]}
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
    height: 62,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE3E6",
    paddingLeft: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  buttonWrapper: {
    flexDirection: "row",
    alignContent: "stretch"
  },
  headerShadow: {
    width: "100%",
    height: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    backgroundColor: "red",
    zIndex: -10,
    top: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
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
  panelTitleWrapper: {
    display: "flex",
    flexDirection: "row",
    flex: 0,
    justifyContent: "space-between"
  },

  buttonUpdate: {
    fontSize: 15,
    marginRight: 10
  },
  buttonUpdateText: {
    fontSize: 15
  },
  buttonUpdateIcon: {
    marginLeft: 10,
    marginRight: -10
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
    filteredWarnings: countFilteredWarnings(state)
  };
};

export default connect(mapStateToProps)(BottomSheetDetails);
