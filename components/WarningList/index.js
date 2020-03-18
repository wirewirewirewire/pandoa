import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { getAllWarnings } from "../../selectors";

function HistoryList({ warnings }) {
  return (
    <List>
      {warnings.map((e, i) => (
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
            <Button transparent>
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
    warnings: getAllWarnings(state)
  };
};

export default connect(mapStateToProps)(HistoryList);
