import React, { useState, useEffect } from "react";
import {
  Button,
  StatusBar,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import reducer from "./reducers";
import { createStore, compose, applyMiddleware } from "redux";
import useLinking from "./navigation/useLinking";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { SplashScreen } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { addTodo } from "./actions";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/commonColor";
import List from "./components/List";

const Stack = createStackNavigator();

import Store from "./configureStore";
const LOCATION_TRACKING = "location-tracking";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log("tracking started?", hasStarted);
  };

  useEffect(() => {
    const config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }
    };

    config();
  }, []);

  /*        <StyleProvider style={getTheme(material)}>
          <ViewScreen />
        </StyleProvider>
        <View style={styles.container}>
          <Button title="Start tracking" onPress={startLocationTracking} />
          <Button title="Report infection?" onPress={startLocationTracking} />
          <List />
            </View>*/

  const store = Store();

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Text>Hallo</Text>
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
  return (
    <Provider store={Store().store}>
      <PersistGate loading={null} persistor={Store().persistor}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  }
});

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);

    Store().store.dispatch(addTodo({ lat, long }));
  }
});
