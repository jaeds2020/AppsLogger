import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';

// Data communication protocol
var mqtt = require('@taoqf/react-native-mqtt')
var client  = mqtt.connect('wss://txio.uitm.edu.my:8888/mqtt')
var topic_mqtt = 'txio_speed';
client.on('connect', function () {
	client.subscribe(topic_mqtt, function (err) {
	  if (!err) {
		console.log('connected',topic_mqtt)
	  }
	})
  
  })

export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} title="Terminal" withBack>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text bold>This is the Terminal screen</Text>
				<Text>The top navigation have back action</Text>
				
			</View>
			
		</Layout>
	);
}
