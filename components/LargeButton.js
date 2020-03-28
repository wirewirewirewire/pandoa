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
    padding: 15,
    backgroundColor: commonColor.innerTouchableBackgroundColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.03,
    shadowRadius: 2.62,

    elevation: 4
  }
});

export default LargeButton;
