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
import { getAllPositions, getAllTracks } from "../../selectors";
import Colors from "../../constants/Colors";
import latLngDistance from "../../helpers/latLngDistance";

const MapHistory = ({ positions, tracks }) => {
  const lines = positions.map(point => {
    //if (point.gps_lng && point.gps_lng) {
    return {
      latitude: point.lat ? point.lat : 0,
      longitude: point.lng ? point.lng : 0
    };
  });
  //updateMap(pointIDs);s

  const connectedPoints = positions.map((position, i) => {
    var combination = [];
    const matches = tracks.find((track, i) => {
      //console.log(track.lat, position.lat);
      const distance = latLngDistance(
        track.lat,
        track.lng,
        position.lat,
        position.lng,
        "M"
      );
      if (distance <= 100) {
        //combination.push(track);
        return { track, distance };
      } else {
        return null;
      }
    });

    return { position, matches };
  });

  console.log("connectedPoints", connectedPoints);

  const points = connectedPoints.map((point, index) => {
    if (!point) return null;
    const coordinates = {
      longitude: point.position.lng,
      latitude: point.position.lat
    };

    return (
      <Marker
        key={index}
        coordinate={coordinates}
        title="Lorem ipsum"
        description="Haloo"
      >
        {point.matches ? (
          <View
            style={[
              styles.matchCircle,
              {
                backgroundColor:
                  point.matches && point.matches.length > 1 ? "red" : "blue"
              }
            ]}
          ></View>
        ) : (
          <View style={styles.historyCircle} />
        )}
        {/*<View
          style={[
            styles.matchCircle,
            {
              backgroundColor:
                point.matches && point.matches.length > 1 ? "red" : "blue"
            }
          ]}
        ></View>*/}
        {/*<MapView.Callout
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
          <Text>Whooo{point.matches && point.matches.length}</Text>
        </MapView.Callout>*/}
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
    positions: getAllPositions(state),
    tracks: getAllTracks(state)
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
  },
  matchCircle: {
    width: 25,
    height: 25,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20 / 2,
    backgroundColor: Colors.tintColor
  }
});

export default connect(mapStateToProps)(MapHistory);
