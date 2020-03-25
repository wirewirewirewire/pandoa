import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";

import { clearAll, reportCase } from "../actions";
import { getAllPositions, getAllTracks } from "../selectors";
import Colors from "../constants/Colors";

import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text,
  Label
} from "native-base";

function ReportForm({ reportCaseTrigger, positions }) {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    Alert.alert("Data submitted");
    reportCaseTrigger(positions);

    // Alert.alert("Form Data", JSON.stringify(data), positions.length);
  };

  return (
    <View>
      <Form>
        <Text style={styles.hintText}>
          On this page you can report if you have got an infection. Please enter
          your details below
        </Text>
        <View style={styles.inputWrapper}>
          <Item>
            <Controller
              as={Input}
              control={control}
              name="firstName"
              onChange={args => args[0].nativeEvent.text}
              rules={{ required: true }}
              defaultValue=""
              placeholder="Username"
            />
          </Item>
          {errors.firstName && <Text>This is required.</Text>}
          <Item>
            <Controller
              as={Input}
              control={control}
              name="lastName"
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
              placeholder="Password"
            />
          </Item>
        </View>

        <Text style={styles.hintText}>
          Enter a contact phone number. This can be yours or a doctors phone
          number.
        </Text>
        <View style={styles.inputWrapper}>
          <Item>
            {/*<Label>Contact phone number</Label>*/}
            <Controller
              as={Input}
              control={control}
              name="contact_phone"
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
            />
          </Item>
        </View>
        <Text style={styles.hintText}>Enter information for you contact.</Text>
        <View style={styles.inputWrapper}>
          <Item style={styles.input}>
            {/*<Label>Contact information</Label>*/}
            <Controller
              as={Input}
              control={control}
              name="contact_information"
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
              placeholder="Contact information"
            />
          </Item>
        </View>
      </Form>
      {/*
      <Form>
        <Item>
          <Input placeholder="Username" />
        </Item>
        <Item last>
          <Input placeholder="Password" />
        </Item>
        <Button primary onPress={reportButton}>
          <Text>Submit data</Text>
        </Button>
</Form>*/}
      <View style={styles.submitWrapper}>
        <Button primary onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hintText: {
    margin: 12,
    marginTop: 30,
    marginBottom: 0,
    fontSize: 13,
    color: Colors.middleText
  },
  submitWrapper: {
    margin: 13
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
    marginTop: 10
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

const mapDispatchToProps = dispatch => ({
  reportCaseTrigger: data => dispatch(reportCase(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
