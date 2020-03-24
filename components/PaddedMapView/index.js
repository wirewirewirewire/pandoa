import React, { Component } from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { getAllPositions } from "../../selectors";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";

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
        <Button
          onPress={this.fitToCenter}
          icon={
            <Icon type="material-community" name="crosshairs-gps" size={25} />
          }
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 50
  },
  containerStyle: {
    position: "absolute",
    top: "12%",
    right: "7%"
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(PaddedMapView);
