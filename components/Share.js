import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Sharing from "expo-sharing";
import { getAllPositions } from "../selectors";
import { connect } from "react-redux";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";

function Share({ children, positions }) {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    //const jsonData = base64.encode(JSON.stringify(positions));
    const jsonData = Buffer.from(JSON.stringify(positions)).toString("base64");
    const url = "data:application/json;base64," + jsonData;

    //console.log("url", url);

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "pandeo-export.json",
      JSON.stringify(positions)
    );

    Sharing.shareAsync(FileSystem.documentDirectory + "pandeo-export.json", {
      message: "pandeo-export.json",
      type: "application/json",
      title: "Gread"
    });
  };

  //Alert.alert("File saved", "All points saved on your local filesystem");

  return (
    <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1 }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(Share);
