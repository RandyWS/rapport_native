import React, {useState, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {_createFriend} from '../Redux';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';

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
  // const [week, setWeek] = useState('');
  // const [imageUrl, setImageUrl] = useState('');

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

  // const monthly = () => {
  //   return (
  //     <>
  //       <Text>
  //         Please optionally select which week in the month you would like to
  //         contact your friend. The default week is the 1st week.
  //       </Text>
  //       <RNPickerSelect
  //         placeholder={{label: 'Please select week of month', value: null}}
  //         onValueChange={value => setWeek(value)}
  //         style={pickerSelectStyles}
  //         items={[
  //           {label: '1st week of the month', value: 1},
  //           {label: '2nd week of the month', value: 2},
  //           {label: '3rd week of the month', value: 3},
  //           {label: '4th week of the month', value: 4},
  //         ]}
  //       />
  //     </>
  //   );
  // };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardcontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nickname (optional)"
            placeholderTextColor="#003f5c"
            onChangeText={nickname => setNickname(nickname)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            onChangeText={firstName => setFirstName(firstName)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={lastName => setLastName(lastName)}
          />
        </View>

        <Text>
          Optionally, please provide a brief description of your friend. This is
          a good place to write how the two of you met, or your friend's likes
          and dislikes.
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Description (optional)"
            placeholderTextColor="#003f5c"
            onChangeText={description => setDescription(description)}
          />
        </View>

        <Text>
          Please select how frequently you would like to contact this friend. We
          recommend contacting friends either weekly or bi-weekly to maintain
          Rapport.
        </Text>

        <RNPickerSelect
          placeholder={{label: 'Please select frequency', value: null}}
          onValueChange={value => setFrequency(value)}
          style={pickerSelectStyles}
          items={[
            {label: 'Daily', value: 'daily'},
            {label: 'Weekly', value: 'weekly'},
            {label: 'Bi-Weekly', value: 'bi-weekly'},
            {label: 'Monthly', value: 'monthly'},
          ]}
        />

        <Text>
          Optionally, please select which day of the week you would like to
          contact this friend. We recommend you choose a day of the week you
          typically have more time. The default day is Sunday.
        </Text>

        <RNPickerSelect
          placeholder={{label: 'Please select day of the week', value: null}}
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

        <Text>Cancel</Text>
      </ScrollView>
    </View>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  cardcontainer: {
    overflow: 'hidden',
    borderWidth: 0,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '100%',
    height: 45,
    marginBottom: 20,

    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: 'center',
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

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
