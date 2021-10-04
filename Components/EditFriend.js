/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {_editFriend, _fetchSingleFriend, resetSingleFriend} from '../Redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

class EditFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      firstName: '',
      lastName: '',
      description: '',
      imageUrl: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleFriend(this.props.route.params.friendId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleFriend !== this.props.singleFriend) {
      const {nickname, firstName, lastName, description, imageUrl} =
        this.props.singleFriend;
      this.setState({nickname, firstName, lastName, description, imageUrl});
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <AntDesign.Button
              name="back"
              backgroundColor="#99c1b9"
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Friend', {
                  friendId: this.props.route.params.friendId,
                })
              }
            />
          </View>
        </View>

        {this.state.imageUrl ? (
          <View style={styles.imageContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: this.state.imageUrl,
              }}
            />
          </View>
        ) : null}

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
            placeholder="Nickname (optional)"
            placeholderTextColor="#003f5c"
            value={this.state.nickname}
            onChangeText={nickname => this.setState({nickname: nickname})}
          />
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.TextInput}
            placeholder="Description (optional)"
            placeholderTextColor="#003f5c"
            value={this.state.description}
            onChangeText={description =>
              this.setState({description: description})
            }
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="ImageUrl"
            placeholderTextColor="#003f5c"
            value={this.state.imageUrl}
            onChangeText={imageUrl => this.setState({imageUrl: imageUrl})}
          />
        </View>

        <Text style={{fontSize: 16, fontWeight: '700'}}>Upload an Image</Text>

        <TouchableOpacity onPress={this.onSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>Edit Friend</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  header: {
    backgroundColor: '#709775',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    padding: 5,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },

  icon: {
    marginRight: 'auto',
    flexDirection: 'row',
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0.2,
      width: -0.4,
    },
    elevation: 0.5,
  },
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#dde5b6',
    borderRadius: 4,
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    width: '100%',

    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 16,
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#dde5b6',
    borderRadius: 4,
    width: '70%',
    height: 200,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    width: '100%',
  },

  imageContent: {
    padding: 20,
    alignItems: 'center',
  },

  avatar: {
    width: 140,
    height: 140,
  },

  loginBtn: {
    width: '100%',
    borderRadius: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#709775',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});

export default connect(mapState, mapDispatch)(EditFriend);
