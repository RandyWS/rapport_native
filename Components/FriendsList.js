/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {_fetchFriends} from '../Redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.icon}>
              <AntDesign.Button
                name="addusergroup"
                backgroundColor="#99c1b9"
                onPress={() => this.props.navigation.navigate('Add Friend')}
              />
            </View>
            <Text style={styles.headerText}>
              Rapport with {friends.length} friend
              {friends.length === 1 ? null : 's'}
            </Text>
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
                    <View style={styles.info}>
                      <Text style={styles.username}>
                        {item.nickname
                          ? item.nickname
                          : `${item.firstName} ${item.lastName}`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
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
    backgroundColor: '#709775',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  headerContent: {
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 'auto',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0.2,
      width: -0.4,
    },
    elevation: 0.5,
  },
  info: {
    flexDirection: 'column',
    padding: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  headerText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#fbfbf2',
    flex: 1,
  },
  box: {
    padding: 15,
    height: 200,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#fff',
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
    fontSize: 25,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
  },
});

export default connect(mapState, mapDispatch)(FriendsList);
