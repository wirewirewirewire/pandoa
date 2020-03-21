import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ReportScreen from "../screens/ReportScreen";
import MapScreen from "../screens/MapScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Warnings";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerShown: false,
    headerMode: "screen",
    headerTitle: getHeaderTitle(route)
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      headerMode="none"
    >
      <BottomTab.Screen
        name="Warnings"
        component={MapScreen}
        options={{
          title: "Warnings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-map" />
          )
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: "Report case",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-umbrella" />
          )
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Debug",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-warning" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Warnings";
    case "History":
      return null;
    case "Report":
      return "Report case";
  }
}
