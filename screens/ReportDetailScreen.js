import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input
} from "native-base";
import { connect } from "react-redux";
import { clearAll, reportCase } from "../actions";
import { getAllPositions } from "../selectors";

import ReportForm from "../components/ReportForm";

function ReportDetailScreen({ navigation, reportCaseTrigger }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ReportForm />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fafafa"
    backgroundColor: "#fdfdfd"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

const mapDispatchToProps = dispatch => ({
  //reportCaseTrigger: data => dispatch(reportCase(data))
  reportCaseTrigger: id => dispatch(reportCase(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailScreen);
