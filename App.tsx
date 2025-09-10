import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store.ts";
// import MainTabNavigator from "./src/navigation/MainTabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen.tsx";
import InitialScreen from "./src/screens/InitialScreen.tsx";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import StoryDetailScreen from "./src/screens/StoryDetailScreen.tsx";
import QuizScreen from "./src/screens/QuizScreen.tsx";
import ResultsScreen from "./src/screens/ResultsScreen.tsx";


const Stack = createStackNavigator();


export default function App() {

    return (
        // <Provider store={store}>
        //     <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: '#000000', height: 180 },
                        headerShadowVisible: false,
                    }}>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ headerShown: false }} />



                        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: false }} />




                    </Stack.Navigator>
                </NavigationContainer>
         //  </PersistGate>
         // </Provider>
    );
}
