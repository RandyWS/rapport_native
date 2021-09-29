/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// redux
import {connect} from 'react-redux';

// Components
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import DrawerItems from './Components/DrawerItems';
import Header from './Components/Header';
import Profile from './Components/Profile';
import RapportCalendar from './Components/Calendar';
import NewCommunication from './Components/NewCommunication';
import AddFriends from './Components/AddFriends';

const Drawer = createDrawerNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="front"
          initialRouteName="Profile"
          screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 10},
          }}>
          {DrawerItems.map(drawer => (
            <Drawer.Screen
              key={drawer.name}
              name={drawer.name}
              options={{
                headerShown: true,
                header: ({navigation, route, options}) => {
                  const title =
                    options.headerTitle !== undefined
                      ? options.headerTitle
                      : options.title !== undefined
                      ? options.title
                      : route.name;
                  return <Header screen={title} />;
                },
              }}
              component={
                drawer.name === 'Profile'
                  ? Profile
                  : drawer.name === 'Calendar'
                  ? RapportCalendar
                  : drawer.name === 'Rapport'
                  ? NewCommunication
                  : drawer.name === 'Friends'
                  ? AddFriends
                  : drawer.name === 'Log In'
                  ? LogIn
                  : SignUp
              }
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(null, null)(App);
