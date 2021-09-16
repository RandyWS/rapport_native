/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerItems from './DrawerItems';
import Header from './Header';
import Profile from './Profile';
import Calendar from './Calendar';
import NewCommunication from './NewCommunication';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import LogIn from './LogIn';
import SignUp from './SignUp';
import {authenticate} from '../redux/loggedIn';

const Drawer = createDrawerNavigator();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({loggedIn: true});
    }
  }

  render() {
    const {loggedIn} = this.state;

    return (
      <SafeAreaView>
        <NavigationContainer>
          <Drawer.Navigator
            drawerType="front"
            initialRouteName="LogIn"
            drawerContentOptions={{
              activeTintColor: '#e91e63',
              itemStyle: {marginVertical: 10},
            }}>
            {loggedIn ? (
              <>
                <Drawer.Screen name="Log In" component={LogIn} />
                <Drawer.Screen name="Sign Up" component={SignUp} />
              </>
            ) : (
              DrawerItems.map(drawer => (
                <Drawer.Screen
                  key={drawer.name}
                  name={drawer.name}
                  options={{
                    headerShown: true,
                    header: ({scene}) => {
                      const {options} = scene.descriptor;
                      const title =
                        options.headerTitle !== undefined
                          ? options.headerTitle
                          : options.title !== undefined
                          ? options.title
                          : scene.route.name;

                      return <Header screen={title} />;
                    },
                  }}
                  component={
                    drawer.name === 'Profile'
                      ? Profile
                      : drawer.name === 'Calendar'
                      ? Calendar
                      : drawer.name === 'Manage Friends'
                      ? AddFriend
                      : NewCommunication
                  }
                />
              ))
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
