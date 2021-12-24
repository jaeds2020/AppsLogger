import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT SCREEN FOR TAB NAVIGATOR
import Home from '../screens/Home';
import About from '../screens/About';
import Terminal from '../screens/Terminal';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator   
      screenOptions={({route})=>({
        tabBarActiveTintColor:"#19A78B",
        tabBarInactiveTintColor:"#A0A0A0",
        tabBarLabelStyle: {
            padding: 1
        },
        tabBarStyle: [{display: "flex"}, null],
        tabBarIcon:({focused,color, size})=>{
         let iconName;
         if (route.name=='Home') { 
          iconName='ios-home' 
         }else if(route.name=="Terminal"){
           iconName="ios-apps"
         }
         else if(route.name=="About"){
          iconName="ios-water"
        }
        return <Ionicons name={iconName} size={size} color={color} />
        }
       }
       )}
      >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Terminal" component={Terminal} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}