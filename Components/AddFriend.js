import React, {useState, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {_createFriend} from '../Redux';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddFriends = props => {
  // friend info
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');

  // time picker state
  const [open, setOpen] = useState(false);

  // contact time preferences
  const [frequency, setFrequency] = useState('weekly');
  const [weekDay, setWeekDay] = useState(0);
  const [time, setTime] = useState(new Date(new Date().setHours(20, 0, 0, 0)));
  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = () => {
    props.createFriend(
      {
        nickname,
        firstName,
        lastName,
        description,
      },
      {
        frequency,
        weekDay,
        time,
      },
    );
    props.navigation.navigate('Friends List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardcontainer}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <AntDesign.Button
              name="back"
              backgroundColor="#99c1b9"
              style={styles.button}
              onPress={() => props.navigation.navigate('Friends List')}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#52796f"
            onChangeText={firstName => setFirstName(firstName)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#52796f"
            onChangeText={lastName => setLastName(lastName)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nickname (optional)"
            placeholderTextColor="#52796f"
            onChangeText={nickname => setNickname(nickname)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Description (optional)"
            placeholderTextColor="#52796f"
            onChangeText={description => setDescription(description)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="ImageUrl"
            placeholderTextColor="#52796f"
            value={imageUrl}
            onChangeText={imageUrl => setImageUrl(imageUrl)}
          />
        </View>

        <View style={styles.inputView}>
          <RNPickerSelect
            placeholder={{
              label: 'Contact frequency (weekly recommended)',
              value: null,
            }}
            onValueChange={value => setFrequency(value)}
            style={pickerSelectStyles}
            items={[
              {label: 'Daily', value: 'daily'},
              {label: 'Weekly', value: 'weekly'},
              {label: 'Bi-Weekly', value: 'bi-weekly'},
              {label: 'Monthly', value: 'monthly'},
            ]}
          />
        </View>

        <View style={styles.inputView}>
          <RNPickerSelect
            placeholder={{
              label: 'Day of the week to contact',
              value: null,
              color: '#52796f',
            }}
            onValueChange={value => setWeekDay(value)}
            style={pickerSelectStyles}
            items={[
              {label: 'Monday', value: 1},
              {label: 'Tuesday', value: 2},
              {label: 'Wednesday', value: 3},
              {label: 'Thursday', value: 4},
              {label: 'Friday', value: 5},
              {label: 'Saturday', value: 6},
              {label: 'Sunday', value: 0},
            ]}
          />
        </View>

        <Text>
          Optionally, please select the time at which you would like to contact
          your friend. We recommend selecting a time you normally have a bit of
          a break (think: during your commute or right after dinner). The
          default time is 8:00pm.
        </Text>

        <TouchableOpacity onPress={() => setOpen(true)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Choose Time</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          mode="time"
          open={open}
          date={time}
          onConfirm={time => {
            setOpen(false);
            setTime(time);
          }}
          onCancel={() => setOpen(false)}
        />

        <Text style={{fontSize: 16, fontWeight: '700'}}>Upload an Image</Text>

        <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>ADD FRIEND</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatch = dispatch => {
  return {
    createFriend: (newFriend, comm) => dispatch(_createFriend(newFriend, comm)),
  };
};

export default connect(null, mapDispatch)(AddFriends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
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
  cardcontainer: {
    overflow: 'hidden',
    borderWidth: 0,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#dde5b6',
    width: '100%',
    height: 45,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4,
  },

  TextInput: {
    height: 50,
    fontSize: 16,
    flex: 1,
    padding: 10,
    alignItems: 'center',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    backgroundColor: '#dde5b6',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',

    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: '#52796f',
    padding: 10,
  },
});
