import React, { useEffect, useRef } from "react";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Body, List, ListItem, Text } from "native-base";
import variable from "../../native-base-theme/variables/platform";
import { connect } from "react-redux";
import { getDetail, getWarning, getCase } from "../../selectors";
import { setDetail, downloadCase } from "../../actions";
import { Ionicons } from "@expo/vector-icons";
import contactLengthText from "../../helpers/contactLengthText";

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
    return (
      <View style={styles.panelInner}>
        {warning && (
          <>
            <List>
              <ListItem itemDivider>
                <Text>Connected to the points</Text>
              </ListItem>
              {warning.matches.map((e, i) => (
                <ListItem key={i}>
                  <Body>
                    <Text>
                      {new Date(e.time).toLocaleDateString("de-DE", options)}
                    </Text>
                    <Text>
                      {e.lat}, {e.lng}
                    </Text>
                  </Body>
                </ListItem>
              ))}
            </List>
            <Text>{JSON.stringify(warning)}</Text>
            <Text>CASE</Text>
            <Text>{JSON.stringify(caseEl)}</Text>
          </>
        )}
      </View>
    );
  };
  const renderInnerHeader = () => {
    return (
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
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      contentPosition={contentPosition}
      snapPoints={[0, 238, 600]}
      onCloseEnd={() => {
        setDetailTrigger(false);
      }}
      renderContent={renderInnerDetails}
      renderHeader={renderInnerHeader}
    />
  );
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
    height: 80,
    //borderBottomWidth: 1,
    //borderBottomColor: "#DFE3E6",
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
    top: -5,
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
