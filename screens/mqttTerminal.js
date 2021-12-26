import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions  } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
var mqtt = require('@taoqf/react-native-mqtt')

var client
let arrayOfData=[]
export default function ({ navigation }) {
// Set input for mqtt server and topic
var mqttServer = 'wss://txio.uitm.edu.my:8888/mqtt'
var mqttTopic1 = 'TRX/random/#'
var mqttTopic2 = 'TRX/random/hmd'

// Display data
// const [textData, setTextData] = useState([])
const [station,setSID]  = useState(null);
const [LAT,setLAT]  = useState(null);
const [LON,setLON]  = useState(null);
const [TMP,setTMP]  = useState(null);
const [HMD,setHMD]  = useState(null);

useEffect(() => {
  try {
    client = mqtt.connect(mqttServer)
    client.on('connect', ()=>
  {
    client.subscribe(mqttTopic1, function (err) {
      if (err) {
        console.log(err)
        client.end()
      }else{
        console.log('connected',mqttTopic1)        
      }
    })
    
    client.on('message', function(topic,message) {
      try {
        if (topic === `TRX/random/gps`){
          let data= JSON.parse(message.toString())
          console.log(data)
          setSID(data.station)
          setLAT(data.LAT)
          setLON(data.LON)
          }
        if (topic === `TRX/random/hmd`){
          let dhmd= JSON.parse(message.toString())
          console.log(dhmd)
          setTMP(dhmd.txTMP)
          setHMD(dhmd.txHMD)
          }
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
      <View style={styles.container}>
      <MapView initialRegion={{
      latitude: Number(LAT),
      longitude: Number(LON),
      // latitude: 3.084868430637176,
      // longitude: 101.38259426398143,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
      }}
      style={styles.map} />
      </View>
      <View style={{height:"6.5%", backgroundColor:"#21c26f", width:"99%", alignItems: 'center',
      justifyContent: 'center', marginTop:10, marginBottom:5,padding:5, borderRadius: 5}}>
      <Text style={{ 
			color: "#fcfcfc", 
			fontSize: 14,
			margin:10, 
			marginBottom:10
			}} bold >LAT: {LAT}   LON: {LON}</Text>
			</View>
      <View style={{height:"7%", backgroundColor:"#231d5e", width:"99%", alignItems: 'center',
      justifyContent: 'center', marginTop:5, marginBottom:10,padding:5, borderRadius: 5}}>
      <Text style={{ 
			color: "#d3cbf5", 
			fontSize: 14,
			margin:10, 
			marginBottom:10
			}} bold >Temperature: {TMP}   Humidity: {HMD}</Text>
			</View>
      </View>
		</Layout>
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