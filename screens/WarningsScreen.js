import React, { useState } from "react";
import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import startLocationTracking from "../helpers/startLocationTracking";
import { clearAll, downloadInfections, generateWarnings } from "../actions";
import WarningList from "../components/WarningList";
import WarningGenerator from "../components/WarningGenerator";
import {
  countTracks,
  countPositions,
  countWarnings,
  getAllPositions,
  getAllTracks,
  countFilteredWarnings
} from "../selectors";
import stopLocationTracking from "../helpers/stopLocationTracking";

function HomeScreen(props) {
  const [trackingStatus, setTrackingStatus] = useState(false);

  const {
    clearAllTrigger,
    downloadInfectionsTrigger,
    generateWarningsTrigger,
    filteredWarningsCount,
    positions,
    tracks,
    positionsCount,
    tracksCount,
    warningsCount,
    navigation
  } = props;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/*<WarningList navigation={navigation} />*/}
        {/*<WarningGenerator navigation={navigation} />*/}

        <View style={styles.getStartedContainer}>
          <Text>
            {trackingStatus ? "Tracking active" : "Tracking disabled"}
          </Text>
          <Button
            title={`Start tracking current: (${positionsCount})`}
            onPress={() => setTrackingStatus(startLocationTracking)}
          />

          <Button
            title={`Stop tracking`}
            onPress={() => {
              stopLocationTracking();
              setTrackingStatus(false);
            }}
          />

          <Button
            title={`Get data from server current: ${tracksCount}`}
            onPress={e => downloadInfectionsTrigger()}
          />
          <Button
            title={`Generate warnings: ${filteredWarningsCount}/${warningsCount}`}
            onPress={e => generateWarningsTrigger({ positions, tracks })}
          />
          <Button title="reset" onPress={e => clearAllTrigger()} />
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

const mapStateToProps = state => {
  return {
    tracksCount: countTracks(state),
    positionsCount: countPositions(state),
    warningsCount: countWarnings(state),
    filteredWarningsCount: countFilteredWarnings(state),
    positions: getAllPositions(state),
    tracks: getAllTracks(state)
  };
};

const mapDispatchToProps = dispatch => ({
  generateWarningsTrigger: data => dispatch(generateWarnings(data)),
  clearAllTrigger: id => dispatch(clearAll(id)),
  downloadInfectionsTrigger: id => dispatch(downloadInfections(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
