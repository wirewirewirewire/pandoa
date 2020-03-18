import React from "react";
import { View } from "native-base";
import { connect } from "react-redux";
import { List, ListItem, Text } from "native-base";
import { getAllPositions } from "../../selectors";

function HistoryList({ positions }) {
  return (
    <List>
      {positions.map((e, i) => (
        <ListItem key={i}>
          <Text>{e.lat}</Text>
          <Text>{e.long}</Text>
        </ListItem>
      ))}
    </List>
  );
}

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(HistoryList);
