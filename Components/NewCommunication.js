import React, {useState, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {_createComm} from '../Redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NewCommunication = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [titleError, setTitleError] = useState('');

  const onSubmit = () => {
    if (!title) {
      setTitleError('You must include a title');
    } else if (title && titleError) {
      setTitleError('');
    }

    if (!titleError) {
      props.createComm({
        friendId: props.route.params.friendId,
        title,
        content,
        type,
        start,
        end,
      });
    }
    props.navigation.navigate('Friends List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <AntDesign.Button
            name="back"
            backgroundColor="#99c1b9"
            style={styles.button}
            onPress={() =>
              props.navigation.navigate('Friend', {
                friendId: props.route.params.friendId,
              })
            }
          />
        </View>
      </View>
      {titleError ? <Text>{titleError}</Text> : null}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="title of entry"
          placeholderTextColor="#52796f"
          onChangeText={title => setTitle(title)}
        />
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.TextInput}
          placeholder="content of conversation"
          placeholderTextColor="#52796f"
          onChangeText={content => setContent(content)}
        />
      </View>

      <RNPickerSelect
        placeholder={{label: 'select type of communication', value: null}}
        onValueChange={value => setType(value)}
        style={pickerSelectStyles}
        items={[
          {label: 'phone-call', value: 'phone-call'},
          {label: 'text', value: 'text'},
          {label: 'social-media', value: 'social-media'},
          {label: 'email', value: 'email'},
          {label: 'letter', value: 'letter'},
          {label: 'other', value: 'other'},
        ]}
      />

      <Text style={styles.username}>
        {start ? `Date of Rapport: ${start.toString().slice(0, 25)}` : null}
      </Text>

      <TouchableOpacity onPress={() => setOpen(true)} style={styles.loginBtn}>
        <Text style={styles.loginText}>Choose date and time of Rapport</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setOpen(true)} style={styles.loginBtn}>
        <Text style={styles.loginText}>Choose end time of Rapport</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={start}
        onConfirm={date => {
          setOpen(false);
          setStart(date);
        }}
        onCancel={() => setOpen(false)}
      />

      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>ADD CONVERSATION</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapDispatch = dispatch => {
  return {
    createComm: newComm => dispatch(_createComm(newComm)),
  };
};

export default connect(null, mapDispatch)(NewCommunication);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#dde5b6',
    borderRadius: 4,
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    width: '100%',

    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 16,
    alignItems: 'center',
  },

  content: {
    backgroundColor: '#dde5b6',
    borderRadius: 4,
    width: '70%',
    height: 200,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    width: '100%',
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
