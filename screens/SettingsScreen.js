import React from "react";
import { StyleSheet, AsyncStorage, Alert } from "react-native";

import {
  Container,
  Header,
  Body,
  Content,
  List,
  ListItem,
  Title,
  Text
} from "native-base";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  logout = () => {
    Alert.alert(
      "Do you want to logout?",
      "You will be redirected to the login screen.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            AsyncStorage.removeItem("userToken");
            this.props.navigation.navigate("Auth");
            console.log("OK Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem
              first
              onPress={() => this.props.navigation.navigate("Billing")}
            >
              <Text>Notifications</Text>
            </ListItem>
            <ListItem>
              <Text>User Settings</Text>
            </ListItem>
            <ListItem>
              <Text>Billing</Text>
            </ListItem>
            <ListItem onPress={this.logout}>
              <Text style={styles.logout}>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  logout: {
    color: "red"
  }
});
