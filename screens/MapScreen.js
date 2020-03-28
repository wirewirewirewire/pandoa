import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import Animated from "react-native-reanimated";
import MapHistory from "../components/MapHistory";
import BottomSheetDetails from "../components/BottomSheetWarnings";
import BottomSheetSingle from "../components/BottomSheetSingle";
import PaddedMapView from "../components/PaddedMapView";
import TrackHistory from "../components/TrackHistory";
import { getDetail } from "../selectors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  trans = new Animated.Value(0);

  updateMap = points => {
    if (points.length <= 0) return null;

    setTimeout(() => {
      if (points.length === 1) {
        this.map.animateToRegion({
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922
        });
      } else {
        this.map.fitToCoordinates(points, {
          edgePadding: { top: 20, right: 40, bottom: 100, left: 40 },
          animated: true
        });
      }
    }, 200);
  };

  state = {
    mapRegion: {
      latitude: 51,
      longitude: 13,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    locationResult: null,
    location: { coords: { latitude: 51, longitude: 13 } }
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };

  render() {
    const { detail } = this.props;
    return (
      <View
        style={styles.container}
        ref={map => {
          this.map = map;
        }}
      >
        <BottomSheetDetails
          detail={detail}
          navigation={this.props.navigation}
        />
        <BottomSheetSingle detail={detail} navigation={this.props.navigation} />
        <PaddedMapView
          style={{ height: Dimensions.get("window").height - 75 }}
          showsMyLocationButton={false}
          showsUserLocation={true}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapHistory updateMap={this.updateMap} />
          <TrackHistory updateMap={this.updateMap} />
        </PaddedMapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 50
  }
});

const mapStateToProps = state => {
  return {
    detail: getDetail(state)
  };
};

export default connect(mapStateToProps)(MapScreen);
