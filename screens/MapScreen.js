import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import MapView from "react-native-maps";
import MapHistory from "../components/MapHistory";
import BottomSheetDetails from "../components/BottomSheetDetails";
import PaddedMapView from "../components/PaddedMapView";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    };
    this.bottomSheetRef = React.createRef();
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  static navigationOptions = {
    header: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentDevice.length === 1) {
      this.bottomSheetRef.current.snapTo(0);
    }
  }

  trans = new Animated.Value(0);

  updateMap = points => {
    if (points.length <= 0) return null;

    setTimeout(() => {
      console.log("points", points);
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

  renderInner = () => <View style={styles.panel}></View>;

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <Text style={styles.panelTitle}>Devices</Text>
    </View>
  );

  toggleDetails = () => {
    this.props.selectDevice([]);
  };

  render() {
    const {
      currentDevice,
      currentDeviceData,
      currentDeviceLastStores,
      currentDeviceLastGpsStores
    } = this.props;
    return (
      <View style={styles.container}>
        <BottomSheetDetails
          bottomSheetRef={this.bottomSheetRef}
          contentPosition={this.trans}
          snapPoints={[166, 238, 600]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
        />
        <PaddedMapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapHistory updateMap={this.updateMap} />
        </PaddedMapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff"
  },
  panel: {
    padding: 20,
    minHeight: 550,
    //backgroundColor: "#f7f5eee8",
    backgroundColor: "#ffffff",
    position: "relative",
    zIndex: 1
  },
  panelInner: {
    padding: 20,
    backgroundColor: "#ffffff"
  },
  header: {
    zIndex: -10,
    position: "relative",
    //backgroundColor: '#f7f5eee8',
    backgroundColor: "#ffffff",
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE3E6",
    paddingLeft: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  headerInner: {
    zIndex: 10,
    position: "relative",
    //backgroundColor: '#f7f5eee8',
    backgroundColor: "#ffffff",
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE3E6",
    paddingLeft: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5
  },
  panelHeader: {
    alignItems: "center",
    display: "flex"
  },
  panelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 3
  },
  panelTitle: {
    fontSize: 22,
    height: 35,
    fontWeight: "bold"
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10
  },
  panelButtonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  panelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#318bfb",
    alignItems: "center",
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white"
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30
  },
  map: {
    height: "100%",
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    fetching: state.fetching
  };
};

export default connect(mapStateToProps)(MapScreen);
