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
import commonColor from "../../native-base-theme/variables/commonColor";

const diffCalc = (position, track) => {
  const distance = latLngDistance(
    track.lat,
    track.lng,
    position.lat,
    position.lng,
    "M"
  );

  const timeDifference = Math.abs(
    Date.parse(position.time) - Date.parse(track.time)
  );
  return { distance, timeDifference };
};

const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

const MapHistory = ({ positions, tracks }) => {
  const lines = positions.map(point => {
    return {
      latitude: point.lat ? point.lat : 0,
      longitude: point.lng ? point.lng : 0
    };
  });

  const connectedPoints = positions.map((position, i) => {
    var matches = tracks.filter((track, i) => {
      const diff = diffCalc(position, track);
      if (diff.distance <= 50 && diff.timeDifference <= 1000 * 60 * 60 * 24) {
        return { track, distance: diff.distance };
      } else {
        return null;
      }
    });

    matches.sort((a, b) => {
      return Date.parse(a.time) - Date.parse(b.time);
    });

    let duration = 0;
    if (matches.length !== 0) {
      duration = Math.abs(
        Date.parse(matches[0].time) -
          Date.parse(matches[matches.length - 1].time)
      );
    }
    return { position, matches, duration };
  });

  var concatPoints = [];
  connectedPoints.forEach((position, i) => {
    const foundSimilar = concatPoints.findIndex(existingPoint => {
      const diff = diffCalc(position, existingPoint);
      if (diff.distance <= 100 && diff.timeDifference <= 1000 * 60 * 60 * 2) {
        return true;
      }
    });
    if (foundSimilar === -1) {
      concatPoints.push(position);
    }
  });

  const connectedLines = connectedPoints.map((point, index) => {
    console.log(connectedLines, point);
    if (point.matches && point.matches.length >= 1) {
      return (
        <>
          {point.matches.map(e => (
            <Polyline
              coordinates={[
                { latitude: point.position.lat, longitude: point.position.lng },
                { latitude: e.lat, longitude: e.lng }
              ]}
              strokeColor="rgba(255,0,0,0.1)" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={["rgba(255,0,0,0.1)", "rgba(255,168,12,0.1)"]}
              strokeWidth={15.5}
            />
          ))}
        </>
      );
    }
  });

  const points = connectedPoints.map((point, index) => {
    const coordinates = {
      longitude: point.position.lng,
      latitude: point.position.lat
    };

    return (
      <Marker
        key={index}
        coordinate={coordinates}
        title={`${new Date(point.position.time).toLocaleDateString(
          "de-DE",
          options
        )}`}
        description={`Contact for ${Math.round(
          point.duration / 1000 / 60
        )} min`}
      >
        {point.matches && point.matches.length >= 1 ? (
          <View style={styles.matchCircle}>
            <View style={styles.matchCircleBackground}></View>
            <View style={styles.matchCircleInner}></View>
          </View>
        ) : (
          <View style={styles.historyCircle} />
        )}
      </Marker>
    );
  });

  return (
    <React.Fragment>
      <Polyline
        coordinates={lines}
        geodesic={true}
        // strokeColor={Colors.tintColor}  fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={2}
        strokeColor="rgba(0,122,255,0.7)"
      />
      {connectedLines}
      {points}
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
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },
  matchCircleBackground: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    opacity: 0.1,
    backgroundColor: commonColor.brandDanger
  },
  matchCircleInner: {
    position: "absolute",
    width: 12,
    height: 12,
    left: 14,
    top: 14,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 25 / 2,
    backgroundColor: commonColor.brandDanger
  }
});

export default connect(mapStateToProps)(MapHistory);
