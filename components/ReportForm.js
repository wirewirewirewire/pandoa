import React from "react";
import { Text, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";

import { clearAll, reportCase } from "../actions";
import { getAllPositions, getAllTracks } from "../selectors";

import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input
} from "native-base";

function ReportForm({ reportCaseTrigger, positions }) {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    reportCaseTrigger(positions);
    Alert.alert("Form Data", JSON.stringify(data), positions.length);
  };

  return (
    <View>
      <Form>
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
      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

const mapDispatchToProps = dispatch => ({
  //reportCaseTrigger: data => dispatch(reportCase(data))
  reportCaseTrigger: data => dispatch(reportCase(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
