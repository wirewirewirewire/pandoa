import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { getAllTracks, getAllPositions } from "../../selectors";

function WarningGenerator({ navigation, positions, tracks }) {
  if (positions && positions.length === 0) {
    return null;
  }
  const results = [];
  positions.map((position, i) => {
    tracks.filter((track, i) => {
      //console.log(track.lat, position.lat);
      if (
        Math.abs(track.lat - position.lat) <= 0.01 &&
        Math.abs(track.lng - position.lng) <= 0.01
      ) {
        results.push(track);
      }
    });
  });

  var aggregatedResults = [];
  results.map((position, i) => {
    if (results[i - 1]) {
      console.log("aaaa", results[i].time);
      aggregatedResults.push(
        Math.abs(Date.parse(results[i].time) - Date.parse(results[i - 1].time))
      );
    }
  });

  console.log("aggregatedResults", aggregatedResults);
  return null;

  return (
    <List>
      {results.map((e, i) => (
        <ListItem key={i}>
          <Body>
            <Text>{e.title}</Text>
            <Text note numberOfLines={2} style={styles.date}>
              Thuesday, 20.02.19 14:20
            </Text>
            <Text note numberOfLines={2}>
              {e.description}
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate("Details")}>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      ))}
    </List>
  );
}

const styles = StyleSheet.create({
  date: {
    color: "#000",
    marginBottom: 12
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state),
    tracks: getAllTracks(state)
  };
};

export default connect(mapStateToProps)(WarningGenerator);
