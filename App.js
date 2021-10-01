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
import {createDrawerNavigator} from '@react-navigation/drawer';

// Components
import LogIn from './Components/LogIn';
import LogOut from './Components/LogOut';
import SignUp from './Components/SignUp';
import {loggedInDrawer, loggedOutDrawer} from './services/DrawerItems';
import deviceState from './services/deviceState';
import Header from './Components/Header';
import Profile from './Components/Profile';
import RapportCalendar from './Components/Calendar';
import NewCommunication from './Components/NewCommunication';
import AddFriends from './Components/AddFriends';

const Drawer = createDrawerNavigator();

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
    console.log('user state', user);

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
                    ? props => <Profile {...props} user={user} />
                    : drawer.name === 'Calendar'
                    ? RapportCalendar
                    : drawer.name === 'Rapport'
                    ? NewCommunication
                    : drawer.name === 'Friends'
                    ? AddFriends
                    : props => <LogOut {...props} newJWT={this.newJWT} />
                }
              />
            ))}
      </Drawer.Navigator>
    );
  }
}

const mapState = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(App);
