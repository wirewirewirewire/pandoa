import React, { Component } from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { getAllPositions } from "../../selectors";

const EDGE_PADDING = {
  top: 30,
  right: 30,
  bottom: 200,
  left: 30
};

class PaddedMapView extends Component {
  fitToMarkers = () => {
    console.log("fit markers");
    const markers = React.Children.map(
      this.props.children,
      child => child.props.coordinate
    );
    const options = {
      edgePadding: EDGE_PADDING,
      animated: false // optional
    };

    const points = this.props.positions.map((point, index) => {
      return {
        longitude: point.long,
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
