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
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 10},
        }}>
        {!this.state.jwt
          ? loggedOutDrawer.map(tab => (
              <Tab.Screen
                key={tab.name}
                name={tab.name}
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
