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
    LAT = JSON.stringify(location.coords.latitude);
    LON = JSON.stringify(location.coords.longitude);
  }

  return (
    <View style={styles.container}>
      <MapView initialRegion={{
      latitude: Number(LAT),
      longitude: Number(LON),
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
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