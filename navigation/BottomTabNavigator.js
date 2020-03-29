import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ReportScreen from "../screens/ReportScreen";
import MapScreen from "../screens/MapScreen";
import MeScreen from "../screens/MeScreen";
import { getDetail } from "../selectors";
import { connect } from "react-redux";
import { useRoute } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function BottomTabNavigator({ detail, navigation, route }) {
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
          tabBarVisible: detail === false,
          title: "Warnings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-map" />
          )
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarVisible: detail === false,
          title: "Me",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          )
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: "Report case",
          tabBarVisible:
            route.state &&
            route.state.routes[1].state &&
            route.state.routes[1].state.index === 0,
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

const mapStateToProps = state => {
  return {
    detail: getDetail(state)
  };
};

export default connect(mapStateToProps)(BottomTabNavigator);
