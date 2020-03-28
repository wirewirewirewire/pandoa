import React from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import commonColor from "../native-base-theme/variables/commonColor";

function LargeButton({ children }) {
  return <View style={styles.largeButton}>{children}</View>;
}

const styles = StyleSheet.create({
  largeButton: {
    flex: 1,
    borderRadius: 10,
    margin: 8,
    padding: 10,
    backgroundColor: commonColor.containerDarkBgColor
  }
});

export default LargeButton;
