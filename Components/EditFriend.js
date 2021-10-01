/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {_editFriend, _fetchSingleFriend, resetSingleFriend} from '../Redux';

class EditFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      firstName: '',
      lastName: '',
      description: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleFriend(this.props.route.params.friendId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleFriend !== this.props.singleFriend) {
      const {nickname, firstName, lastName, description} =
        this.props.singleFriend;
      this.setState({nickname, firstName, lastName, description});
    }
  }

  componentWillUnmount() {
    this.props.resetSingleFriend();
  }

  onSubmit() {
    this.props.editFriend({...this.state}, this.props.route.params.friendId);
    this.props.navigation.navigate('Friend', {
      friendId: this.props.route.params.friendId,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nickname"
            placeholderTextColor="#003f5c"
            value={this.state.nickname}
            onChangeText={nickname => this.setState({nickname: nickname})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            value={this.state.firstName}
            onChangeText={firstName => this.setState({firstName: firstName})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({lastName: lastName})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Description"
            placeholderTextColor="#003f5c"
            value={this.state.description}
            onChangeText={description =>
              this.setState({description: description})
            }
          />
        </View>

        <Text style={{fontSize: 16, fontWeight: '700'}}>Upload an Image</Text>

        <TouchableOpacity onPress={this.onSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>Edit Friend</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapState = state => {
  return {
    singleFriend: state.singleFriend,
  };
};

const mapDispatch = (dispatch, {navigation}) => {
  return {
    fetchSingleFriend: friendId => dispatch(_fetchSingleFriend(friendId)),
    editFriend: (friend, friendId) =>
      dispatch(_editFriend(friend, friendId, navigation)),
    resetSingleFriend: () => dispatch(resetSingleFriend()),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: 'center',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF1493',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});

export default connect(mapState, mapDispatch)(EditFriend);
