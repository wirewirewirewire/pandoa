import * as React from "react";
import ReportIntroScreen from "./ReportIntroScreen";
import ReportDetailScreen from "./ReportDetailScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function LinksScreen() {
  return (
    <Stack.Navigator initialRouteName="ReportIntro">
      <Stack.Screen name="ReportIntro" component={ReportIntroScreen} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
    </Stack.Navigator>
  );
}
