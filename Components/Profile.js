/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>Profile Screen</Text>
      </View>
    );
  }
}

export default connect(null, null)(Profile);
