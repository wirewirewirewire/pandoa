import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { getAllTracks, getAllPositions } from "../selectors";
import latLngDistance from "../helpers/latLngDistance";

function WarningGenerator({ navigation, positions, tracks }) {
  if (positions && positions.length === 0) {
    return null;
  }
  const results = [];
  positions.map((position, i) => {
    var combination = [];
    tracks.filter((track, i) => {
      //console.log(track.lat, position.lat);
      const distance = latLngDistance(
        track.lat,
        track.lng,
        position.lat,
        position.lng,
        "M"
      );
      if (distance <= 100) {
        //combination.push(track);
        results.push({ track, position, distance });
      }
    });
    //if (combination.length !== 0) results.push(combination);
  });

  var aggregatedResults = [[]];

  if (results.length === 0) {
    return null;
  }
  results.map((position, i) => {
    if (
      results[i - 1] &&
      Math.abs(
        Date.parse(results[i].track.time) -
          Date.parse(results[i - 1].track.time)
      ) /
        1000 >=
        60
    ) {
      aggregatedResults.push([position]);
    } else {
      aggregatedResults[aggregatedResults.length - 1].push(position);
    }
  });

  console.log(aggregatedResults);
  return null;
  const resultList = aggregatedResults.map((e, i) => {
    e.sort((a, b) => {
      return Date.parse(a.time) - Date.parse(b.time);
    });

    return {
      description: "hallo",
      timeStart: e[0].time,
      length: e.length,
      data: e,
      title: "Hallo",
      difference: Math.abs(
        Date.parse(e[0].time) - Date.parse(e[e.length - 1].time)
      )
    };
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  return (
    <List>
      {resultList.map((e, i) => {
        const date = new Date(Date.parse(e.timeStart));
        return (
          <ListItem key={i}>
            <Body>
              <Text>{e.title}</Text>
              <Text note numberOfLines={2} style={styles.date}>
                {date.toLocaleDateString("de-DE", options)}
              </Text>
              <Text note numberOfLines={2}>
                Contact with a person infected for about {e.difference / 1000}{" "}
                min
              </Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => navigation.navigate("Details")}
              >
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
        );
      })}
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
