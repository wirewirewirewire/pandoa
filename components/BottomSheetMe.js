import React, { useState, useEffect, useRef } from "react";
import * as Sharing from "expo-sharing";

import {
  Switch,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import startLocationTracking from "../helpers/startLocationTracking";
import stopLocationTracking from "../helpers/stopLocationTracking";

import { Button, Icon, StyleProvider, Text } from "native-base";
import { connect } from "react-redux";
import WarningList from "./WarningList";
import LargeButton from "./LargeButton";
import { countFilteredWarnings } from "../selectors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import commonColor from "../native-base-theme/variables/commonColor";
import Share from "./Share";

function BottomSheetMe(props) {
  const bottomSheetRef = useRef();
  const [trackingStatus, setTrackingStatus] = useState(false);

  const toggleSwitch = e => {
    if (e === true) {
      startLocationTracking();
      setTrackingStatus(true);
    } else {
      stopLocationTracking();
      setTrackingStatus(false);
    }
    console.log("toggleSwitch", e);
  };

  const { contentPosition, filteredWarnings, navigation } = props;

  const renderInnerDetails = () => {
    return (
      <View style={styles.panelInner}>
        <View style={styles.buttonWrapper}>
          <LargeButton>
            <View style={styles.switchTracking}>
              <View style={styles.description}>
                <Text>Enable tracking</Text>
                <Text style={styles.subText}>
                  This will record your movement every 5 min
                </Text>
              </View>
              <Switch onValueChange={toggleSwitch} value={trackingStatus} />
            </View>
          </LargeButton>
        </View>
        <View style={styles.buttonWrapper}>
          <LargeButton>
            <MaterialCommunityIcons
              name="file-import"
              size={33}
              color={commonColor.brandPrimary}
            />
            <Text>Import </Text>
          </LargeButton>
          <LargeButton>
            <MaterialCommunityIcons
              name="database-export"
              size={33}
              color={commonColor.brandSuccess}
            />
            <Text>Export</Text>
          </LargeButton>
          <Share />
        </View>
        <View style={styles.buttonWrapper}>
          <LargeButton>
            <View style={styles.switchTracking}>
              <View style={styles.description}>
                <Text>Remove points</Text>
                <Text style={styles.subText}>
                  Remove points from your route
                </Text>
              </View>

              <MaterialCommunityIcons
                name="chevron-right"
                size={33}
                color={commonColor.textColorLight}
              />
            </View>
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
            <Text style={styles.panelTitle}>My tracks</Text>
          </View>
        </View>
      </>
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

const styles = StyleSheet.create({
  panelInner: {
    position: "relative",
    zIndex: 30,
    backgroundColor: commonColor.containerDarkBgColor,
    minHeight: 540
  },
  switchTracking: {
    flexDirection: "row",
    alignContent: "stretch"
  },
  description: {
    flex: 1
  },
  subText: {
    fontSize: 12,
    color: commonColor.textColorLight
  },
  headerInner: {
    zIndex: -10,
    position: "relative",
    backgroundColor: commonColor.containerDarkBgColor,
    paddingTop: 10,
    height: 50,
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

export default connect(mapStateToProps)(BottomSheetMe);
