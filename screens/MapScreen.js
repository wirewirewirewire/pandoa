import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Button, Icon } from 'react-native-elements';
import Animated from "react-native-reanimated";
import MapHistory from "../components/MapHistory";
import BottomSheetDetails from "../components/BottomSheetDetails";
import BottomSheetSingle from "../components/BottomSheetSingle";
import PaddedMapView from "../components/PaddedMapView";
import TrackHistory from "../components/TrackHistory";
import { getDetail } from "../selectors";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });


  };

  onPress = async () => {
    console.log("trigger ");
    let location = await Location.getCurrentPositionAsync({});

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.01
      };

      console.log("trigger 2 ", region);
      this.map.animateToRegion(region,1000)
  };


  render() {
    
    const locateIcon = () => (
      <Icon
        type='material-community'
        name='crosshairs-gps'
        size={25}
      />
    );
    const { detail } = this.props;
    return (
      <View style={styles.container}>
        <BottomSheetDetails
          detail={detail}
          navigation={this.props.navigation}
        />
        <BottomSheetSingle detail={detail} navigation={this.props.navigation} />
        <PaddedMapView
          ref={(map) => { this.map = map; }}
          style={{ height: Dimensions.get("window").height - 75 }}
          showsMyLocationButton={false}
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
        <Button
            onPress={this.onPress}
            icon={locateIcon}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'white',
    borderRadius: 50
  },
  container: {
    flex: 1
  },
  containerStyle: {
    position: 'absolute',
    top: '12%',
    right: '7%',
  }
});

const mapStateToProps = state => {
  return {
    detail: getDetail(state)
  };
};

export default connect(mapStateToProps)(MapScreen);
