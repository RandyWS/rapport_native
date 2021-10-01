import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import FriendsList from '../Components/FriendsList';
import SingleFriend from '../Components/SingleFriend';
import AddFriend from '../Components/AddFriend';
import NewCommunication from '../Components/NewCommunication';
import SingleCommunication from '../Components/SingleCommunication';
import Calendar from '../Components/Calendar';
import Profile from '../Components/Profile';

const Stack = createNativeStackNavigator();

export const FriendsNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Friends List" component={FriendsList} />
      <Stack.Screen name="Friend" component={SingleFriend} />
      <Stack.Screen name="Communication" component={SingleCommunication} />
      <Stack.Screen name="Add Friend" component={AddFriend} />
      <Stack.Screen name="Add Communication" component={NewCommunication} />
    </Stack.Navigator>
  );
};

export const CalendarNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  );
};

export const ProfileNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
