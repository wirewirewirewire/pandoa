import React, { useEffect, useState, useRef } from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Body, List, ListItem, Text } from "native-base";
import variable from "../../native-base-theme/variables/platform";
import { connect } from "react-redux";
import {
  getAllWarnings,
  getDetail,
  getWarning,
  getCase
} from "../../selectors";
import { setDetail, downloadCase } from "../../actions";

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
  const [detailState, setDetail] = useState(detail);
  const bottomSheetRef = useRef();

  console.log("bottomSheetRef", detailState, detail);

  useEffect(() => {
    console.log("detail updated", detail);
    let snap = 0;
    if (detail !== false) {
      console.log("haswarning", warning);
      if (warning && warning.matches) {
        downloadCaseTrigger({
          lat: warning.matches[0].lat,
          lng: warning.matches[0].lng,
          time: warning.matches[0].time
        });
      }
      snap = 1;
    }
    //setTimeout(() => {
    bottomSheetRef.current.snapTo(snap);
    //}, 200);
  }, [detail]);

  /*if (detailState !== detail) {
    setDetail(detail);
    console.log("bottomSheetRef", bottomSheetRef);

    if (detail !== false) {
      setTimeout(() => {
        console.log("haswarning", warning);
        if (warning && warning.matches) {
          downloadCaseTrigger({
            lat: warning.matches[0].lat,
            lng: warning.matches[0].lng,
            time: warning.matches[0].time
          });
        }
        bottomSheetRef.current.snapTo(1);
      }, 200);
    } else {
      setTimeout(() => {
        bottomSheetRef.current.snapTo(0);
      }, 200);
    }
  }*/

  //TODO: improve implementation
  /*UNSAFE_componentWillReceiveProps(nextProps) {
    const { warning } = nextProps;
    if (nextProps.detail !== false) {
      setTimeout(() => {
        console.log("haswarning", warning);
        if (warning && warning.matches) {
          nextProps.downloadCaseTrigger({
            lat: warning.matches[0].lat,
            lng: warning.matches[0].lng,
            time: warning.matches[0].time
          });
        }
        this.bottomSheetRef.current.snapTo(1);
      }, 200);
    } else {
      setTimeout(() => {
        this.bottomSheetRef.current.snapTo(0);
      }, 200);
    }
  }
*/

  const renderInnerDetails = () => {
    return (
      <View style={styles.panelInner}>
        {warning && (
          <>
            <Text>
              Contact for {Math.round(warning.duration / 1000 / 60)}min
            </Text>
            <List>
              {warning.matches.map((e, i) => (
                <ListItem key={i}>
                  <Body>
                    <Text>
                      {new Date(e.time).toLocaleDateString("de-DE", options)}
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
          <Text style={styles.panelTitle}>Detail</Text>
          <TouchableOpacity
            roundeds
            light
            onPress={() => setDetailTrigger(false)}
            style={styles.panelClose}
          >
            <Text>x</Text>
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
