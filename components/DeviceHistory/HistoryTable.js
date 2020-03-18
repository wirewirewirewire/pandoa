import React from "react";
import { connect } from "react-redux";
//import classNames from 'classnames';
import { StyleSheet } from "react-native";
import moment from "moment";
//import { Element } from 'react-scroll';
import Empty from "../Empty";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  View
} from "native-base";

function calcDateDifference(newDate, prevDate) {
  // Convert both dates to milliseconds

  const newDateMs = new Date(newDate).getTime();
  const prevDateMs = new Date(prevDate).getTime();

  // Calculate the difference in milliseconds
  const differenceMs = newDateMs - prevDateMs;
  return Math.round(differenceMs);
}

const options = {
  hour: "numeric",
  minute: "numeric"
};

const Link = () => {
  return null;
};

/*
const List = () => {
  return null;
}

const ListItem = () => {
  return null;
}*/

const HistoryTableItem = props => {
  const {
    currentDeviceClass,
    currentStore,
    deviceId,
    showDetails,
    store
  } = props;
  const {
    ack,
    time,
    gps_lat,
    gps_lng,
    rssi,
    snr,
    serverTime,
    gps_info_acklimit,
    gps_info_geofence,
    gps_info_nogps,
    gps_status_bat,
    gps_status_temp
  } = store;
  const newDate = new Date(time);
  const dateDifference = calcDateDifference(
    time,
    props.prevStore ? props.prevStore.time : time
  );

  const dateFormat = isNaN(newDate)
    ? time
    : new Intl.DateTimeFormat(["ban", "id"]).format(newDate);
  const timeFormat = isNaN(newDate)
    ? ""
    : new Intl.DateTimeFormat("de-DE", options).format(newDate);

  const selectStoreTrigger = () => {
    props.selectStore(deviceId, store._id);
  };
  /*
    const tableClasses = classNames({
      'history-table__item': true,
      'history-table__item--no-gps': gps_lat === null || gps_lng === null,
      'history-table__item--selected': currentStore && currentStore.storeId === store._id,
    });
    */

  if (
    gps_lat !== null ||
    (gps_info_nogps === false && ack === false) ||
    showDetails === true
  ) {
    return (
      <ListItem
        style={styles.historyTableItem}
        name={`scroll-${store._id}`}
        onClick={selectStoreTrigger}
      >
        <Body>
          {currentDeviceClass === "track" ? (
            <Address store={store} />
          ) : (
            <Text styles={address}>
              <Text style={styles.addressTitle}>Medikamenteneinnahme</Text>
              <Text style={styles.addressSubTitle}>
                06108 Halle (Saale), Germany
              </Text>
            </Text>
          )}
          <Text note>
            <Text style={styles.historyTableDate}>{dateFormat}</Text>
            <Text style={styles.historyTableDate}> {timeFormat}</Text>
          </Text>

          {/*{showDetails &&
            <List className="history-table__details" kind="simple" small colon>
              <ListItem title="Time">{new Date(serverTime).toLocaleString("de-DE").toString()}</ListItem>
              <ListItem title="GPS">
                {gps_lat ? (
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${gps_lat},${gps_lng}`}
                    target="_blank"
                  >
                    lat: {gps_lat}, lng: {gps_lng} {store.gps_info_nogps ? 'inaccurate' : ''}
                  </Link>
                ) : (
                    <span>no GPS ({ack ? 'settings update' : (gps_info_nogps === false && ack === false) ? 'Button pressed' : gps_info_geofence ? 'inside geofence' : 'no fix found'})</span>
                  )
                }
              </ListItem>
              <ListItem title="ACK">
                {ack && gps_info_acklimit && !gps_lng ? 'Settings asked (limit reached)' : ack && !gps_lng ? 'Settings update (ack & !acklimit)' : 'false'}
              </ListItem>
              <ListItem title="ACK limit">{store.gps_info_acklimit ? 'reached (true)' : 'false'}</ListItem>
              <ListItem title="Geofence">{gps_info_geofence ? 'inside (true)' : 'outside (false)'} </ListItem>
              <ListItem title="No GPS">{store.gps_info_nogps ? 'true' : 'false'}</ListItem>
              <ListItem title="GPS Quickfix">{store.gps_info_quickfix ? 'saved (true)' : 'not found (false)'}</ListItem>
              <ListItem title="SNR">{snr}</ListItem>
              <ListItem title="RSSI">{rssi} ({rssi <= -140 ? 'bad' : rssi <= -130 ? 'medium' : 'good'})</ListItem>
              <ListItem title="Batterie">{gps_status_bat} V{' '}
                <Battery style={{ width: 20 }} level={gps_status_bat} />
              </ListItem>
              <ListItem title="Temperature">{gps_status_temp ? `${gps_status_temp} °C` : 'no temperature send'}</ListItem>
            </List>
          }*/}
        </Body>

        <Right style={styles.historyTableDate}>
          <Text note>
            {Math.round((dateDifference / 1000 / 60) * 100) / 100} min
          </Text>
        </Right>
      </ListItem>
    );
  } else {
    return null;
  }
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(30, "days"),
      endDate: moment()
    };
  }

  componentWillReceiveProps(nextProps) {
    /*if ((nextProps.currentStore !== this.props.currentStore) && nextProps.currentStore) {
      const historyTableItemScrollElement = document.getElementById(`scroll-${nextProps.currentStore.storeId}`);
    }*/
  }

  render() {
    const {
      currentDevice,
      currentDeviceClass,
      currentStore,
      selectStore,
      showDetails,
      stores
    } = this.props;

    const selectedStores = stores ? stores[currentDevice[0]] : undefined;

    /*const tableClasses = classNames({
      'history-table': true
    });*/

    /* let selectedStoresFiltered = selectedStores && !showDetails ? selectedStores.filter(selectedStores => selectedStores.gps_lat !== null) : selectedStores ? selectedStores : []; */

    let selectedStoresFiltered = selectedStores ? selectedStores : [];
    selectedStoresFiltered = selectedStoresFiltered.slice().reverse();

    const historyTableItems = selectedStoresFiltered.map((store, index) => {
      return (
        <View key={index} name={`scroll-${store._id}`}>
          <HistoryTableItem
            currentDeviceClass={currentDeviceClass}
            currentStore={currentStore}
            deviceId={currentDevice[0]}
            store={store}
            selectStore={selectStore}
            prevStore={
              selectedStoresFiltered[index + 1]
                ? selectedStoresFiltered[index + 1]
                : undefined
            }
            showDetails={showDetails}
          />
        </View>
      );
    });
    //className={tableClasses}
    return (
      <View style={styles.historyTable}>
        <List>{historyTableItems}</List>

        {historyTableItems.length === 0 && (
          <Empty kind="large" title="No data found">
            Please select another period
          </Empty>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  historyTable: {
    marginLeft: -20,
    marginRight: -20
  },
  historyTableItem: {
    /*  borderBottomColor: '#CCC',
     borderBottomWidth: 1,
     paddingLeft: 40,
     paddingRight: 20, */
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0
  },
  historyTableDate: {
    /* color: '#CCC',
    fontSize: 15 */
  }
});

const mapStateToProps = state => {
  return {
    fetching: state.reducer.fetching,
    stores: state.reducer.stores,
    devices: state.reducer.devices,
    currentStore: state.reducer.currentStore,
    error: state.reducer.error,
    currentDevice: state.reducer.currentDevice,
    currentDeviceClass:
      state.reducer.devices &&
      state.reducer.currentDevice &&
      state.reducer.devices[state.reducer.currentDevice[0]]
        ? state.reducer.devices[state.reducer.currentDevice[0]].deviceClass
        : undefined,
    showDetails: state.reducer.showDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDetails: value =>
      dispatch({ type: "TOGGLE_DETAILS", showDetails: value }),
    selectStore: (deviceId, storeId) =>
      dispatch({ type: "SELECT_STORE", deviceId: deviceId, storeId: storeId })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
