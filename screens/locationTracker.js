import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Text from '../components/utils/UbuntuFont';
import Layout from '../components/global/Layout';

export default function ({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  let LON = ''; let LAT = '';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    LAT = JSON.stringify(location.coords.latitude);
    LON = JSON.stringify(location.coords.longitude);
  }

  return (
    <Layout navigation={navigation} name="locationTracker">
    <View style={styles.container}>
      <Text style={styles.paragraph}>LON: {LON}</Text>
      <Text style={styles.paragraph}>LAT: {LAT}</Text>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
