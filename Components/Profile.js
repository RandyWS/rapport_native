/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          username: 'johndoe1',
        },
        {
          id: 2,
          image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          username: 'johndoe2',
        },
        {
          id: 3,
          image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          username: 'johndoe3',
        },
        {
          id: 4,
          image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          username: 'johndoe4',
        },
        {
          id: 5,
          image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          username: 'johndoe5',
        },
        {
          id: 6,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          username: 'johndoe6',
        },
        {
          id: 7,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          username: 'johndoe1',
        },
        {
          id: 8,
          image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          username: 'johndoe2',
        },
        {
          id: 9,
          image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          username: 'johndoe3',
        },
        {
          id: 10,
          image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          username: 'johndoe4',
        },
        {
          id: 11,
          image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          username: 'johndoe5',
        },
        {
          id: 12,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          username: 'johndoe6',
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-otter-appafo-ghondsary.jpg',
              }}
            />
            <Text style={styles.name}>John Doe</Text>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            enableEmptySections={true}
            data={this.state.data}
            contentContainerStyle={styles.cardcontainer}
            keyExtractor={item => {
              return item.id;
            }}
            scrollEnabled={true}
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.box}>
                    <Image style={styles.image} source={{uri: item.image}} />
                    <Text style={styles.username}>{item.username}</Text>
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

const styles = StyleSheet.create({
  cardcontainer: {
    overflow: 'hidden',
    borderWidth: 0,
  },
  container: {
    flex: 1,
    marginTop: 53,
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

export default connect(null, null)(Profile);
