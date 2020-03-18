import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { getAllTracks, getAllPositions } from "../../selectors";

function WarningGenerator({ navigation, positions, tracks }) {
  console.log("positions", positions);
  if (positions && positions.length === 0) {
    return null;
  }
  const results = [];
  positions.map((position, i) => {
    const found = tracks.filter((track, i) => {
      if (Math.abs(track.lat - position.lat) <= 0.001) {
        results.push(track);
      }
    });
  });

  console.log("alerts", results);

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
