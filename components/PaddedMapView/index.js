import React, { Component } from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { getAllPositions } from "../../selectors";
import { Button, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

//import { Button, Icon } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const EDGE_PADDING = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 30
};

class PaddedMapView extends Component {
  fitToMarkers = () => {
    if (this.props.positions.length === 0) return null;

    const options = {
      edgePadding: EDGE_PADDING,
      animated: false
    };

    const points = this.props.positions.map(point => {
      return {
        longitude: point.lng,
        latitude: point.lat
      };
    });
    this.ref.fitToCoordinates(points, options);
  };

  fitToCenter = () => {
    if (this.props.positions.length === 0) return null;

    const options = {
      edgePadding: EDGE_PADDING,
      animated: false
    };

    const points = this.props.positions.map(point => {
      return {
        longitude: point.lng,
        latitude: point.lat
      };
    });
    this.ref.fitToCoordinates(points, options);
  };

  render() {
    return (
      <>
        <MapView
          ref={map => {
            this.ref = map;
          }}
          onLayout={this.fitToMarkers}
          {...this.props}
        />
        <View style={styles.view}>
          <TouchableOpacity style={styles.button} onPress={this.fitToCenter}>
            <Ionicons name="md-locate" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    right: "0%",
    top: "9%",
    flex: 1,
    width: 60,
    height: 60,
    padding: 0
  },
  button: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 0,
    zIndex: 1,
    margin: 5,
    paddingTop: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,

    elevation: 5
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(PaddedMapView);
