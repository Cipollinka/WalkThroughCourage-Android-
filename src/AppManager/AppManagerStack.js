import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppManagerMain from './AppManagerMain';
import AppManagerChild from './AppManagerChild';

const StackInstance = createStackNavigator();

export default function AppManagerStack({dataLoad, userAgent}) {
  return (
    <NavigationContainer>
      <StackInstance.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="main">
        <StackInstance.Screen
          name="main"
          component={AppManagerMain}
          initialParams={{data: dataLoad, userAgent: userAgent}}
        />
        <StackInstance.Screen name="child" component={AppManagerChild} />
      </StackInstance.Navigator>
    </NavigationContainer>
  );
}
