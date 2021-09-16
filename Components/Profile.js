/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {connect} from 'react-redux';
import User from './user';
import {FriendsList} from './FriendsList';
import {Link} from 'react-router-dom';
import {_fetchUser, setUser} from '../redux/user';
import Unauthorized from './Unauthorized';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userFriends: [],
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userName);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
    if (prevProps.userFriends !== this.props.userFriends) {
      this.setState({
        userFriends: this.props.userFriends,
      });
    }
  }

  render() {
    if (this.props.message === 'Unauthorized') {
      return <Unauthorized />;
    }
    const user = {...this.props.user} || {};
    const friends = this.state.userFriends || [];
    const path = `/user/${this.props.match.params.userName}/calendar`;

    return (
      <View>
        <ScrollView
          // ref="_scrollView"
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}>
          <Link to={path} underlayColor="#f0f4f7">
            <Text>Components</Text>
          </Link>
          {user.id ? <User user={user} /> : <Text>''</Text>}
          {!friends.length ? (
            <Text>You have no friends!</Text>
          ) : (
            ((<Text>Rapport with {friends.length} friends!</Text>),
            friends.map(friend => (
              <FriendsList friend={friend} key={friend.id} />
            )))
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userFriends: state.userFriends,
    loggedIn: state.loggedIn,
    message: state.authMessage,
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    clearUser: () => dispatch(setUser({})),
    fetchUser: username => dispatch(_fetchUser(username, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
