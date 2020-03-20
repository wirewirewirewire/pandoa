import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { getAllWarnings } from "../../selectors";

const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

function WarningList({ navigation, warnings }) {
  const filteredWarnings = warnings.filter(
    e => e.matches && e.matches.length >= 1
  );
  return (
    <List>
      {filteredWarnings.map((e, i) => (
        <ListItem key={i}>
          <Body>
            <Text>{e.title}</Text>
            <Text note numberOfLines={2} style={styles.date}>
              {new Date(e.position.time).toLocaleDateString("de-DE", options)}
            </Text>
            <Text note numberOfLines={2}>
              {e.matches && e.matches.length >= 1
                ? `Contact for ${Math.round(e.duration / 1000 / 60)} min`
                : "no contact found"}
            </Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigation.push("WarningDetail")}
            >
              <Text>Details</Text>
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
    warnings: getAllWarnings(state)
  };
};

export default connect(mapStateToProps)(WarningList);
