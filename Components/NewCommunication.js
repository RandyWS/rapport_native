import React, {useState, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {_createComm} from '../Redux';

const NewCommunication = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    props.createComm({title, content, type, start, end});
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="title of entry"
          placeholderTextColor="#003f5c"
          onChangeText={title => setTitle(title)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="content of conversation"
          placeholderTextColor="#003f5c"
          onChangeText={content => setContent(content)}
        />
      </View>

      {/* <Text style={styles.username}>
        {date ? `Date of Rapport: ${date.toString().slice(0, 25)}` : null}
      </Text> */}

      <TouchableOpacity onPress={() => setOpen(true)} style={styles.loginBtn}>
        <Text style={styles.loginText}>Choose Date</Text>
      </TouchableOpacity>

      {/* <DatePicker
        modal
        open={open}
        date={start}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => setOpen(false)}
      /> */}

      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>ADD CONVERSATION</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
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
});
