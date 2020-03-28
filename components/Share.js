import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { getAllPositions } from "../selectors";
import { connect } from "react-redux";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";

function Share({ positions }) {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    //const jsonData = base64.encode(JSON.stringify(positions));
    const jsonData = Buffer.from(JSON.stringify(positions)).toString("base64");
    const url = "data:application/json;base64," + jsonData;

    console.log("url", url);

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "hello.json",
      url
    );
    /*
    Sharing.shareAsync(url, {
      message: "hello",
      type: "application/json",
      title: "Gread"
    });*/
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
        <Text style={styles.buttonText}>Share this photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(Share);
