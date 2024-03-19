import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Home';
import RnCalendar from './src/rnCalender';
import CalenderPicker from './src/calenderPicker';
import RnRangePicker from './src/rnRangePicker';
import RndateRangePicker from './src/rndateRangePicker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='CalenderPicker' component={CalenderPicker}/>
      <Stack.Screen name='RnCalender' component={RnCalendar} />
      <Stack.Screen name='RangePicker' component={RnRangePicker}/>
      <Stack.Screen name='DateRangePicker' component={RndateRangePicker}/>

     </Stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({});