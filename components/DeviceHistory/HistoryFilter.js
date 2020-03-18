import React from "react";
import { connect } from "react-redux";
//import 'react-dates/initialize';
//import { withRouter } from 'react-router';

import { Button, Text } from "native-base";
import { View } from "react-native";

import moment from "moment";
//import MyForm from './HistoryFilterForm';

const filterList = {
  today: {
    description: "Today",
    frame: "days",
    from: moment()
      .startOf("day")
      .toDate(),
    to: undefined
  },
  yesterday: {
    description: "Yesterday",
    frame: "days",
    from: moment()
      .subtract(1, "days")
      .startOf("day")
      .toDate(),
    to: moment()
      .subtract(1, "days")
      .endOf("day")
      .toDate()
  },
  lastWeek: {
    description: "last week",
    frame: "weeks",
    from: moment()
      .subtract(1, "weeks")
      .startOf("day")
      .toDate(),
    to: undefined
  },
  lastMonth: {
    description: "last month",
    frame: "months",
    from: moment()
      .subtract(1, "months")
      .startOf("day")
      .toDate(),
    to: undefined
  }
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(30, "days"),
      endDate: moment()
    };
  }

  handleSubmit = values => {
    const { lastDates, dateRange } = values;
    const { currentDevice, onRequestStores } = this.props;

    var from;
    var to;

    console.log(lastDates);

    if (lastDates === "custom") {
      from =
        dateRange && dateRange.startDate
          ? dateRange.startDate.toDate()
          : undefined;
      to =
        dateRange && dateRange.endDate ? dateRange.endDate.toDate() : undefined;
      additionalFilter =
        dateRange && dateRange.startDate && dateRange.endDate
          ? `/${dateRange.startDate.toDate()},${dateRange.endDate.toDate()}`
          : "";
    } else {
      from = filterList[lastDates].from;
      to = filterList[lastDates].to;
    }

    console.log("from", from, to);

    onRequestStores({
      id: currentDevice[0],
      from: from,
      to: to
    });
  };

  render() {
    const initialValues = {
      dateRange: {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    };

    return (
      <View className="history-filter">
        {Object.keys(filterList).map((item, i) => (
          <Button
            light
            key={i}
            onPress={e => {
              this.handleSubmit({ lastDates: item });
            }}
          >
            <Text>{filterList[item].description}</Text>
          </Button>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.reducer.fetching,
    devices: state.reducer.devices,
    stores: state.reducer.stores,
    error: state.reducer.error,
    lastStores: state.reducer.lastStores,
    lastGpsStores: state.reducer.lastGpsStores,
    currentDevice: state.reducer.currentDevice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestStores: e => dispatch({ type: "API_CALL_STORES_REQUEST", data: e })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
