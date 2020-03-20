import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import VirusImage from "../assets/images/virus-image-01";
import commonColor from "../native-base-theme/variables/commonColor";
//import VirusImage from "../assets/images/infoSimple";

export default function WarningDetailScreen({ navigation }) {
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.introWrapper}>
        <VirusImage width={220} style={styles.image} />
        <Text style={styles.title}>No case reported</Text>
        <Text style={styles.subTitle}>
          None of your positions will be send to the internet until you report a
          case.
        </Text>
        <Button primary onPress={() => navigation.push("ReportDetail")}>
          <Text>Report infection</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonColor.containerDarkBgColor
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  introWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginTop: -20,
    marginBottom: 10,
    width: 300,
    height: 300
  },
  title: {
    fontSize: 30,
    marginBottom: 10
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    color: commonColor.textColorLight,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  contentContainer: {
    paddingTop: 15
  }
});
