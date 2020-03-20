import React, { Component } from "react";
import { connect } from "react-redux";
import MapView, { Circle, Heatmap, Polyline } from "react-native-maps";
import { StyleSheet, Platform } from "react-native";
import { getAllPositions, getAllTracks } from "../../selectors";
import Colors from "../../constants/Colors";

const MapHistory = ({ positions }) => {
  const lines = positions.map(point => {
    //if (point.gps_lng && point.gps_lng) {
    return {
      latitude: point.lat ? point.lat : 0,
      longitude: point.lng ? point.lng : 0
    };
  });
  //updateMap(pointIDs);s

  const points = positions.map((point, index) => {
    const coordinates = {
      longitude: point.lng,
      latitude: point.lat
    };
    return (
      <Circle
        key={index}
        center={coordinates}
        fillColor="#000"
        radius={Platform.OS === "ios" ? 1 : 0.1}
      />
    );
  });

  return (
    <React.Fragment>
      {points}
      {/*<Heatmap
        points={lines}
        opacity={1}
        radius={Platform.OS === "ios" ? 50 : 15}
        maxIntensity={100}
        gradient={{
          colors: [Colors.warningText, Colors.warningText],
          startPoints: [0, 1],
          colorMapSize: 500
        }}
        heatmapMode={"POINTS_DENSITY"}
        key="aaaa"
      />*/}
      {/*<Polyline
        coordinates={lines}
        geodesic={true}
        strokeColor={Colors.warningText} // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={5}
      />*/}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    positions: getAllTracks(state)
  };
};

const styles = StyleSheet.create({
  historyCircle: {
    width: 3, // 50,
    height: 3, // 50,
    borderRadius: 50 / 2,
    opacity: 0.3, //0.01,
    backgroundColor: "#000" //Colors.tintColor
  }
});

export default connect(mapStateToProps)(MapHistory);
