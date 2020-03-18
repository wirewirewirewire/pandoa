import React, { Component } from "react";
import { connect } from "react-redux";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { getAllPositions } from "../../selectors";
import Colors from "../../constants/Colors";

const MapHistory = ({ positions }) => {
  const lines = positions.map(point => {
    //if (point.gps_lng && point.gps_lng) {
    return {
      latitude: point.lat ? point.lat : 0,
      longitude: point.long ? point.long : 0
    };
  });
  //updateMap(pointIDs);s

  const points = positions.map((point, index) => {
    const coordinates = {
      longitude: point.long,
      latitude: point.lat
    };
    return (
      <Marker key={index} coordinate={coordinates} title="Lorem ipsum">
        <View style={styles.historyCircle}></View>
        <MapView.Callout
          style={{
            minWidth: 150,
            backgroundColor: "white",
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5
          }}
          tooltip={true}
          //onPress={() => this.onCalloutPress(idKey)}
        >
          <Text>{point.date}</Text>
        </MapView.Callout>
      </Marker>
    );
  });

  return (
    <React.Fragment>
      {points}
      <Polyline
        coordinates={lines}
        geodesic={true}
        strokeColor={Colors.tintColor} // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={2}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

const styles = StyleSheet.create({
  historyCircle: {
    width: 5,
    height: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20 / 2,
    backgroundColor: Colors.tintColor
  }
});

export default connect(mapStateToProps)(MapHistory);
