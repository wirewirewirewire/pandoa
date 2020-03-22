import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { setDetail } from "../../actions";
import { getAllWarnings } from "../../selectors";
import SoapImage from "../../assets/images/soap";
import commonColor from "../../native-base-theme/variables/commonColor";
import contactLengthText from "../../helpers/contactLengthText";

const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

function WarningList({ navigation, setDetailTrigger, warnings }) {
  const filteredWarnings = warnings.filter(
    e => e.matches && e.matches.length >= 1
  );
  if (filteredWarnings.length === 0) {
    return (
      <View style={styles.introWrapper}>
        <SoapImage width={220} style={styles.image} />
        <Text style={styles.title}>No warning</Text>
        <Text style={styles.subTitle}>
          There is currently no contact reported.
        </Text>
      </View>
    );
  }

  return (
    <List>
      {filteredWarnings.map((e, i) => (
        <ListItem key={i}>
          <Body>
            <Text>{e.title}</Text>
            <Text numberOfLines={2} style={styles.date}>
              {new Date(e.position.time).toLocaleDateString("de-DE", options)}
            </Text>
            <Text note numberOfLines={2}>
              {e.matches &&
                e.matches.length >= 1 &&
                contactLengthText(e.duration)}
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={() => setDetailTrigger(i)}>
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
  },
  introWrapper: {
    height: 540,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginTop: -90,
    marginBottom: 10,
    width: 300,
    height: 300
  },
  title: {
    fontSize: 30,
    marginTop: -70,
    marginBottom: 10
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    color: commonColor.textColorLight,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  }
});

const mapStateToProps = state => {
  return {
    warnings: getAllWarnings(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setDetailTrigger: id => dispatch(setDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningList);
