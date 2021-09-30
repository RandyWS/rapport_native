/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Components
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import {loggedInDrawer, loggedOutDrawer} from './services/DrawerItems';
import deviceState from './services/deviceState';
import Header from './Components/Header';
import Profile from './Components/Profile';
import RapportCalendar from './Components/Calendar';
import NewCommunication from './Components/NewCommunication';
import AddFriends from './Components/AddFriends';

const Drawer = createDrawerNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      loading: true,
    };
    this.newJWT = this.newJWT.bind(this);
    this.loadJWT = deviceState.loadJWT.bind(this);
    this.deleteJWT = deviceState.deleteJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt) {
    this.setState({
      jwt: jwt,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }

    console.log('state', this.state);

    return (
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Profile"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 10},
        }}>
        {!this.state.jwt
          ? loggedOutDrawer.map(drawer => (
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
                  drawer.name === 'Log In'
                    ? props => <LogIn {...props} newJWT={this.newJWT} />
                    : props => <SignUp {...props} newJWT={this.newJWT} />
                }
              />
            ))
          : loggedInDrawer.map(drawer => (
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
                    : AddFriends
                }
              />
            ))}
      </Drawer.Navigator>
    );
  }
}
