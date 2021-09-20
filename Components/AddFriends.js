import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {connect} from 'react-redux';

class AddFriends extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>Add Friend</Text>
      </View>
    );
  }
}

export default connect(null, null)(AddFriends);
