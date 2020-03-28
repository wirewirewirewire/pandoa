import React, { useEffect, useRef } from "react";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Body, List, ListItem, Text } from "native-base";
import variable from "../native-base-theme/variables/platform";
import { connect } from "react-redux";
import { getDetail, getWarning, getCase } from "../selectors";
import { setDetail, downloadCase } from "../actions";
import { Ionicons } from "@expo/vector-icons";
import contactLengthText from "../helpers/contactLengthText";
import commonColor from "../native-base-theme/variables/commonColor";

const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

function BottomSheetSingle({
  downloadCaseTrigger,
  caseEl,
  contentPosition,
  detail,
  setDetailTrigger,
  warning
}) {
  const bottomSheetRef = useRef();

  useEffect(() => {
    let snap = 0;
    if (detail !== false) {
      if (warning && warning.matches.length >= 1) {
        downloadCaseTrigger({
          lat: warning.matches[0].lat,
          lng: warning.matches[0].lng,
          time: warning.matches[0].time
        });
      }
      snap = 1;
    }
    bottomSheetRef.current.snapTo(snap);
  }, [detail]);

  const renderInnerDetails = () => {
    const geocode =
      warning && warning.position.geocode && warning.position.geocode[0]
        ? warning.position.geocode[0]
        : {};
    return (
      <View style={styles.panelInner}>
        {warning && (
          <>
            <View style={styles.pointList}>
              <View>
                <Text style={styles.pointListHeading}>
                  Connected to the points
                </Text>
              </View>
              {warning.matches.map((e, i) => {
                const geocodePoint =
                  e && e.position && e.position.geocode && e.position.geocode[0]
                    ? e.position.geocode[0]
                    : undefined;

                return (
                  <View key={i} style={styles.pointListElement}>
                    <Text>
                      {new Date(e.time).toLocaleDateString("de-DE", options)}
                    </Text>
                    {geocodePoint && (
                      <Text>
                        {geocodePoint.name}, {geocodePoint.postalCode}{" "}
                        {geocodePoint.city}
                      </Text>
                    )}
                    <Text>
                      {e.lat}, {e.lng}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/*<Text>{JSON.stringify(warning)}</Text>
            <Text>CASE</Text>
            <Text>{JSON.stringify(caseEl)}</Text>*/}
          </>
        )}
      </View>
    );
  };
  const renderInnerHeader = () => {
    const geocode =
      warning && warning.position.geocode && warning.position.geocode[0]
        ? warning.position.geocode[0]
        : {};
    return (
      <>
        <View style={styles.headerShadow}></View>
        <View style={styles.headerInner}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>

          <View style={styles.close}>
            <Text style={styles.panelTitle}>
              {warning &&
                new Date(warning.position.time).toLocaleDateString(
                  "de-DE",
                  options
                )}
            </Text>
            {geocode && (
              <Text style={styles.panelSubTitle}>
                {geocode.name}, {geocode.postalCode} {geocode.city}
              </Text>
            )}
            <Text style={styles.panelSubTitle}>
              {warning && contactLengthText(warning.duration)}
            </Text>

            <TouchableOpacity
              roundeds
              light
              onPress={() => setDetailTrigger(false)}
              style={styles.panelClose}
            >
              <Ionicons name="md-close" size={23} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      contentPosition={contentPosition}
      snapPoints={[0, 238, 400]}
      onCloseEnd={() => {
        setDetailTrigger(false);
      }}
      renderContent={renderInnerDetails}
      renderHeader={renderInnerHeader}
    />
  );
}
export const styles = StyleSheet.create({
  bottomSheetWrapper: {
    //position: "relative",
    // top: 20
  },
  panelInner: {
    position: "relative",
    minHeight: 540,
    zIndex: 30,
    backgroundColor: "#ffffff"
  },
  pointListHeading: {
    fontWeight: "bold",
    marginBottom: 10
  },
  pointList: {
    margin: 20,
    backgroundColor: commonColor.containerDarkBgColor,
    borderRadius: 10,
    padding: 15
  },
  pointListElement: {
    marginTop: 10,
    marginBottom: 10
  },
  headerInner: {
    zIndex: -10,
    position: "relative",
    backgroundColor: "#ffffff",
    paddingTop: 10,
    height: 80,
    //borderBottomWidth: 1,
    //borderBottomColor: "#DFE3E6",
    paddingLeft: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
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
  panelTitle: {
    fontSize: 19,
    height: 35,
    marginTop: 6,
    fontWeight: "bold"
  },
  panelSubTitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginTop: -10
  },
  panelClose: {
    position: "absolute",
    right: 12,
    top: -3,
    width: 37,
    height: 37,
    borderRadius: 100,
    backgroundColor: variable.brandLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    detail: getDetail(state),
    caseEl: getCase(state),
    warning: getWarning(state)
  };
};

const mapDispatchToProps = dispatch => ({
  downloadCaseTrigger: data => dispatch(downloadCase(data)),
  setDetailTrigger: id => dispatch(setDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheetSingle);
