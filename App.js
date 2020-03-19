import React, { useState, useEffect } from "react";
import { Button, Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

const Stack = createStackNavigator();

import Store from "./configureStore";
import startLocationTracking from "./helpers/startLocationTracking";
import { addTodo } from "./actions";
import { StyleProvider } from "native-base";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/commonColor";
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
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
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

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={Store().store}>
        <PersistGate loading={null} persistor={Store().persistor}>
          <StyleProvider style={getTheme(material)}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}

              <Button title="Start tracking" onPress={startLocationTracking} />
              <NavigationContainer
                ref={containerRef}
                initialState={initialNavigationState}
              >
                <Stack.Navigator>
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    let lng = locations[0].coords.longitude;

    console.log(
      `Location: ${new Date(Date.now()).toISOString()}: ${lat},${lng}`
    );

    Store().store.dispatch(
      addTodo({ time: new Date(Date.now()).toISOString(), lat, lng })
    );
  }
});
