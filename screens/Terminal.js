import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView  } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
var mqtt = require('@taoqf/react-native-mqtt')

var client
let arrayOfData=[]
export default function ({ navigation }) {

// Change state
function connectServer(){
  setButtonCondition(!buttonCondition)
}

//  Change state and disconnect client MQTT
function disconnectServer(){
  setEdit(true)
  setSelect(true)
  if(client){
    client.end()
    setConnectButton(false)
    setDisconnectButton(true)
    setTextData([])
  }
}

// Set input for mqtt server and topic
const [mqttServer, setMqttServer] = useState(null)
const [mqttTopic, setMqttTopic] = useState(null)

// Set logic for button, input state for connected and disconnected
const [buttonCondition, setButtonCondition] = useState(false)
const [edit, setEdit] = useState(true)
const [select, setSelect] = useState(true)
const [connectButton, setConnectButton] = useState(false)
const [disconnectButton, setDisconnectButton] = useState(true)

// Display data
const [textData, setTextData] = useState([])



useEffect(() => {
  try {
    client = mqtt.connect("wss://"+mqttServer+":8888/mqtt")
    client.on('connect', ()=>
  {
    client.subscribe(mqttTopic, function (err) {
      if (err) {
        console.log(err)
        client.end()
      }else{
        console.log('connected',mqttTopic)
        setEdit(false)
        setSelect(false)
        setConnectButton(true)
        setDisconnectButton(false)
        
      }
    })
    client.on('message', function(topic,message) {
      try {
        let data= JSON.parse(message.toString())
        if(arrayOfData.length<10){
          arrayOfData.push(JSON.stringify(data))
        }
		// else{
        //   arrayOfData.splice(0, 1)
        //   arrayOfData.push(JSON.stringify(data))
        // }
        setTextData(arrayOfData)
        // console.log(arrayOfData)
      }catch (error) {
        console.log('error parse')
      }
    });
  }
  )

  } catch (error) {
     console.log(error)
  }
}, [buttonCondition]) //re-run function if connect button is clicked

useEffect(() => {

}, [])

	return (
		<Layout navigation={navigation} name="Terminal">
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
        <View style={{width:"85%", margin:10}}>
        <TextInput
         style={{height: 40,backgroundColor: 'azure', fontSize: 20, borderRadius: 5}}  
          placeholder='   MQTT server'
          onChangeText ={(text)=> (setMqttServer(text))}
          editable={edit} selectTextOnFocus={select}
        />
        </View>
        <View style={{width:"85%", margin:10, marginBottom:20}}>
        <TextInput
         style={{height: 40,backgroundColor: 'azure', fontSize: 20, borderRadius: 5}}  
          placeholder='   MQTT topic'
          onChangeText ={(text)=> (setMqttTopic(text))}
          editable={edit} selectTextOnFocus={select}
        />
        </View>
        <View style={{width:"85%", justifyContent:'space-evenly', flexDirection:'row'}}>
          <View>
            <Button 
			onPress={connectServer}
            disabled={connectButton}
            title="Connect" 
			/>
          </View>
          <View>
            <Button 
			onPress={disconnectServer}
            disabled={disconnectButton}
            title="Disconnect"/>
          </View>
        </View>
        <View style={{height:"55%", backgroundColor:"#1b1f36", width:"85%", marginTop:20, padding:15, borderRadius: 10}}>
          <Text style={{ 
			color: "#fcfcfc", 
			fontSize: 20,
			margin:10, 
			marginBottom:10
			}} >{textData}</Text>
        </View>
			</View>
		</Layout>
	);
}
