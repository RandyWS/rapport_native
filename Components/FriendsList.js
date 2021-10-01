/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {_fetchFriends} from '../Redux';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }

  componentDidMount() {
    this.props.fetchFriends();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.friends !== this.props.friends) {
      this.setState({friends: this.props.friends});
    }
  }

  render() {
    const {friends} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>
              Rapport with {friends.length} friend
              {friends.length === 1 ? null : 's'}:
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Add Friend')}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Add a Friend</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            enableEmptySections={true}
            data={friends}
            contentContainerStyle={styles.cardcontainer}
            keyExtractor={item => {
              return item.id;
            }}
            scrollEnabled={true}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Friend', {
                      friendId: item.id,
                    })
                  }>
                  <View style={styles.box}>
                    <Image style={styles.image} source={{uri: item.imageUrl}} />
                    <Text style={styles.username}>
                      {item.nickname
                        ? item.nickname
                        : `${item.firstName} ${item.lastName}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    friends: state.friends,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchFriends: () => dispatch(_fetchFriends()),
  };
};

const styles = StyleSheet.create({
  cardcontainer: {
    overflow: 'hidden',
    borderWidth: 0,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#20B2AA',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
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

  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    padding: 30,
    backgroundColor: '#E6E6FA',
    flex: 1,
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default connect(mapState, mapDispatch)(FriendsList);
