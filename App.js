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
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import {
  FriendsNavigator,
  CalendarNavigator,
  ProfileNavigator,
} from './Navigation/Stacks.js';
import LogIn from './Components/LogIn';
import LogOut from './Components/LogOut';
import SignUp from './Components/SignUp';
import {loggedInDrawer, loggedOutDrawer} from './services/DrawerItems';
import deviceState from './services/deviceState';
import Header from './Components/Header';
import Profile from './Components/Profile';
import RapportCalendar from './Components/Calendar';
import NewCommunication from './Components/NewCommunication';
import FriendsList from './Components/FriendsList';

const Tab = createBottomTabNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      loading: true,
      user: {},
    };
    this.newJWT = this.newJWT.bind(this);
    this.loadJWT = deviceState.loadJWT.bind(this);
    this.deleteJWT = deviceState.deleteJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt, user) {
    this.setState({
      jwt: jwt,
      user: user,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.id !== this.props.auth.id) {
      this.setState({user: this.props.auth});
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }

    const user = this.state.user;

    return (
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={{
          activeTintColor: '#6ede8a',
          itemStyle: {marginVertical: 10},
          inactiveTintColor: '#dde5b6',
          style: {
            backgroundColor: '#00818A',
          },
        }}>
        {!this.state.jwt
          ? loggedOutDrawer.map(tab => (
              <Tab.Screen
                key={tab.name}
                name={tab.name}
                options={{
                  tabBarIcon: ({color, focused}) => {
                    let iconName;

                    if (tab.name === 'Log In') {
                      return (
                        <Feather
                          name="log-in"
                          focused={focused}
                          size={25}
                          color={color}
                        />
                      );
                    } else if (tab.name === 'Sign Up') {
                      return (
                        <AntDesign
                          name="adduser"
                          focused={focused}
                          size={25}
                          color={color}
                        />
                      );
                    }
                  },

                  tabBarActiveTintColor: '#6ede8a',
                  tabBarInactiveTintColor: '#97a97c',
                  headerShown: false,
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
                  tab.name === 'Log In'
                    ? props => <LogIn {...props} newJWT={this.newJWT} />
                    : props => <SignUp {...props} newJWT={this.newJWT} />
                }
              />
            ))
          : loggedInDrawer.map(tab => (
              <Tab.Screen
                key={tab.name}
                name={tab.name}
                options={{
                  tabBarIcon: ({color, focused}) => {
                    let iconName;

                    if (tab.name === 'Profile Screens') {
                      return (
                        <Ionicons
                          name="person-circle-outline"
                          focused={focused}
                          size={25}
                          color={color}
                        />
                      );
                    } else if (tab.name === 'Calendar Screens') {
                      return (
                        <Feather
                          name="calendar"
                          focused={focused}
                          size={25}
                          color={color}
                        />
                      );
                    } else if (tab.name === 'Log Out') {
                      <Feather
                        name="log-out"
                        focused={focused}
                        size={25}
                        color={color}
                      />;
                    } else {
                      return (
                        <Ionicons
                          name="people-outline"
                          focused={focused}
                          size={25}
                          color={color}
                        />
                      );
                    }
                  },

                  tabBarActiveTintColor: '#6ede8a',
                  tabBarInactiveTintColor: '#97a97c',
                  headerShown: false,
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
                  tab.name === 'Profile Screens'
                    ? props => <ProfileNavigator {...props} user={user} />
                    : tab.name === 'Calendar Screens'
                    ? props => <CalendarNavigator {...props} />
                    : tab.name === 'Rapport'
                    ? props => <FriendsNavigator {...props} />
                    : props => <LogOut {...props} newJWT={this.newJWT} />
                }
              />
            ))}
      </Tab.Navigator>
    );
  }
}

const mapState = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(App);
