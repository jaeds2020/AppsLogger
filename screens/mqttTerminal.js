import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';

// Data communication protocol
var mqtt = require('@taoqf/react-native-mqtt')
var server_mqtt = 'wss://txio.uitm.edu.my:8888/mqtt'
var client  = mqtt.connect(server_mqtt)
var topic_mqtt = 'txio_speed'

function mqttTerminal() {
    useEffect(()=>{
        displayData = async ()=>{  
          try{  
            client  = mqtt.connect(`${server_mqtt}`)
            client.on('connect', function(){
              console.log('connected control screen')
            })
    
            client.subscribe(topic_mqtt, function (err) {
              if (!err) {
                 console.log('connected',topic_mqtt)
               }
            })
    
            client.on('message', function (topic, message) {
              console.log(topic)
                let data= JSON.parse(message.toString())
                  console.log(data)
                }
            )
          }
          catch(error){  
            alert(error)  
          } 
      
        } 
        displayData()
      }, [])
}

export default function mqttTerminalScreen() {
    return (
      <ControlStack.Navigator>
        <ControlStack.Screen name="Control" component={mqttTerminal} 
        options={{
          title: 'Smart Fertigation Dashboard',
          headerStyle: {
            backgroundColor: '#141414',
            height: Platform.OS === 'android' ? 70 : 90,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:Platform.OS === 'android' ? 14 : 16,
            alignSelf:'center'
          },
          header: () => (
            <SafeAreaView
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop:Platform.OS === 'android' ? 40 : 50,
                height: Platform.OS === 'android' ? 80 : 80,
                backgroundColor: '#141414',
                borderBottomColor:"#444444",
                borderBottomWidth:1
              }}>
              <Image
                style={{width:20,
                height:20, marginRight:10}}
                source={require('../assets/Nex-plexIcon2.png')}
              />
              <Text style={{color:"#ffffff", fontSize:Platform.OS === 'android' ? 16 : 17,fontWeight:'bold'}}>SMART FERTIGATION DASHBOARD</Text>
            </SafeAreaView>
          ),
        }}/>
      </ControlStack.Navigator>
    );
  }