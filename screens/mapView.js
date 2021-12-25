import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

// Setup Location tracking permission
export default function mapView() {
   const [location, setLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   var LON = ''; 
   var LAT = '';

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    LAT = JSON.parse(location.coords.latitude);
    LON = JSON.parse(location.coords.longitude);
    console.log(LAT, LON);
  }

  return (
    <View style={styles.container}>
      <MapView initialRegion={{
    //   latitude: Number(LAT),
    //   longitude: Number(LON),
      latitude: 3.084868430637176,
      longitude: 101.38259426398143,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    }}
    style={styles.map} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});