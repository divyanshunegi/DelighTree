/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TaskViewScreen from './screens/TaskViewScreen';
import AssignEmployee from './screens/AssignEmployee';
const MainStack = createStackNavigator();
const Modal = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Create task"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#854dff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MainStack.Screen name="Create task" component={HomeScreen} />
      <MainStack.Screen
        name="Task View Screen"
        component={TaskViewScreen}
        options={({route}) => ({title: route.params.taskTitle})}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="#854dff" hidden />
      <NavigationContainer>
        <Modal.Navigator mode="modal" headerMode="none">
          <Modal.Screen name="Main" component={MainStackScreen} />
          <Modal.Screen name="Assign Employee" component={AssignEmployee} />
        </Modal.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
