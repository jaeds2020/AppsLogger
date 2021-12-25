import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView  } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
var mqtt = require('@taoqf/react-native-mqtt')

var client
let arrayOfData=[]
export default function ({ navigation }) {

// Set input for mqtt server and topic
var mqttServer = 'wss://txio.uitm.edu.my:8888/mqtt'
var mqttTopic = 'TRX/gps/random'

// Display data
// const [textData, setTextData] = useState([])
const [station,setSID]  = useState(null);
const [LAT,setLAT]  = useState(null);
const [LON,setLON]  = useState(null);


useEffect(() => {
  try {
    client = mqtt.connect(mqttServer)
    client.on('connect', ()=>
  {
    client.subscribe(mqttTopic, function (err) {
      if (err) {
        console.log(err)
        client.end()
      }else{
        console.log('connected',mqttTopic)        
      }
    })
    client.on('message', function(topic,message) {
      try {
        let data= JSON.parse(message.toString())
        console.log(data)
        setSID(data.station)
        setLAT(data.LAT)
        setLON(data.LON)
      }catch (error) {
        console.log('error parse')
      }
    });
  }
  )

  } catch (error) {
     console.log(error)
  }
}, []) //re-run function if connect button is clicked

useEffect(() => {

}, [])

	return (
		<Layout navigation={navigation} name="mqttTerminal">
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor:"#8290e0",
				}}
			>
		<Text style={{ 
			color: "#a1bee6", 
			fontSize: 20,
			margin:10, 
			marginBottom:10
			}} 
			bold
			>WebSocket Logger</Text>
        <View style={{height:"55%", backgroundColor:"#1b1f36", width:"85%", marginTop:20, padding:15, borderRadius: 10}}>
          <Text style={{ 
			color: "#fcfcfc", 
			fontSize: 20,
			margin:10, 
			marginBottom:10
			}} >STATION: {station}, LAT: {LAT}, LON: {LON}</Text>
        </View>
			</View>
		</Layout>
	);
}
