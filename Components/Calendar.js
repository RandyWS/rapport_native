import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>Calendar Screen</Text>
      </View>
    );
  }
}

export default connect(null, null)(Calendar);
