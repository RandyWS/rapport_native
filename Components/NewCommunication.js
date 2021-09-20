import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class NewCommunication extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>New Communication</Text>
      </View>
    );
  }
}

export default connect(null, null)(NewCommunication);
