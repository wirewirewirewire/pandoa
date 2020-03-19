import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import VirusImage from "../assets/images/virus-image-01";
//import VirusImage from "../assets/images/infoSimple";

export default function ReportIntroScreen({ navigation }) {
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
    alignItems: "center"
  },
  contentContainer: {
    backgroundColor: "green",
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
    marginBottom: 15
  },
  subTitle: {
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  }
});
