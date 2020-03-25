import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Body, Button, Right, List, ListItem, Text } from "native-base";
import { setDetail } from "../../actions";
import { getAllWarnings, getAllFilteredWarnings } from "../../selectors";
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
      {filteredWarnings.map((e, i) => {
        const geocode =
          e.position.geocode && e.position.geocode[0]
            ? e.position.geocode[0]
            : {};
        return (
          <ListItem key={i} onPress={() => setDetailTrigger(e)}>
            <Body>
              <Text>{e.title}</Text>
              <Text numberOfLines={1} style={styles.date}>
                {new Date(e.position.time).toLocaleDateString("de-DE", options)}
              </Text>
              <Text note style={styles.location}>
                {geocode.name}, {geocode.postalCode} {geocode.city}
              </Text>
              <Text note style={styles.time}>
                {e.matches &&
                  e.matches.length >= 1 &&
                  contactLengthText(e.duration)}
              </Text>
            </Body>
            <Right>
              <Text
                style={[
                  styles.right,
                  {
                    color:
                      e.duration > 10
                        ? commonColor.brandDanger
                        : commonColor.brandWarning
                  }
                ]}
              >
                {e.matches &&
                  e.matches.length >= 1 &&
                  contactLengthText(e.duration, "short")}
              </Text>
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
    marginTop: -5,
    marginBottom: 7
  },
  location: {
    color: "#8A8F94",
    fontWeight: "300",
    marginBottom: 0
  },
  time: {
    color: "#8A8F94",
    fontWeight: "300",
    marginBottom: 7
  },
  right: {
    width: 180,
    color: commonColor.brandPrimary,
    marginTop: -30,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "right",
    display: "flex",
    alignItems: "flex-end"
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
