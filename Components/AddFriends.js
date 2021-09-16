import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Link,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';

class AddFriend extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Add Friend</Text>
      </View>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };

// const mapDispatchToProps = (dispatch, {history}) => {
//   return {};
// };

export default connect(null, null)(AddFriend);
