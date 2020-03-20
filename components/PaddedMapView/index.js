import React, { Component } from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { getAllPositions } from "../../selectors";

const EDGE_PADDING = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 30
};

class PaddedMapView extends Component {
  fitToMarkers = () => {
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
      <MapView
        ref={map => {
          this.ref = map;
        }}
        onLayout={this.fitToMarkers}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(PaddedMapView);
