import {NativeRouter, Route, Link} from 'react-router-native';
import {StyleSheet, Text, View, AppRegistry} from 'react-native';
import SideMenu from 'react-native-side-menu';

import axios from 'axios';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Calendar from './Calendar';
import UserPage from './UserPage';
import SignUp from './SignUp';
import SingleContact from './SingleContact';
import NewContact from './NewContact';
import {authenticate} from '../redux/loggedIn';

const Routes = () => {
  // This is doing a sample authenticated call
  // if this call fails, we are not logged in
  // and we can update state accordingly.
  // everytime loggedIn changes, we try this again.
  // to update the message
  useEffect(() => {
    authenticate();
  });

  return (
    <NativeRouter>
      <SideMenu menu={menu}>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/user/:userName" component={UserPage} />
        <Route exact path="/user/:userName/calendar" component={Calendar} />
        <Route exact path="/user/:userName/addMessage" component={NewContact} />
        <Route
          exact
          path="/user/:userName/:contactId"
          component={SingleContact}
        />
      </SideMenu>
    </NativeRouter>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default connect(null, mapDispatchToProps)(Routes);
