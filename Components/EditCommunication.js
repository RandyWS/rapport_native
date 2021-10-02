// import React, {useState, Component} from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import {connect} from 'react-redux';
// import DatePicker from 'react-native-date-picker';
// import RNPickerSelect from 'react-native-picker-select';
// import {_createComm} from '../Redux';

// const EditCommunication = props => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [type, setType] = useState('');
//   const [start, setStart] = useState(new Date());
//   const [end, setEnd] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [titleError, setTitleError] = useState('');

//   const onSubmit = () => {
//     if (!title) {
//       setTitleError('You must include a title');
//     } else if (title && titleError) {
//       setTitleError('');
//     }

//     if (!titleError) {
//       // props.createComm({title, content, type, start, end});
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {titleError ? <Text>{titleError}</Text> : null}
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="title of entry"
//           placeholderTextColor="#003f5c"
//           onChangeText={title => setTitle(title)}
//         />
//       </View>

//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="content of conversation"
//           placeholderTextColor="#003f5c"
//           onChangeText={content => setContent(content)}
//         />
//       </View>

//       <RNPickerSelect
//         placeholder={{label: 'select type of communication', value: null}}
//         onValueChange={value => setType(value)}
//         style={pickerSelectStyles}
//         items={[
//           {label: 'phone-call', value: 'phone-call'},
//           {label: 'text', value: 'text'},
//           {label: 'social-media', value: 'social-media'},
//           {label: 'email', value: 'email'},
//           {label: 'letter', value: 'letter'},
//           {label: 'other', value: 'other'},
//         ]}
//       />

//       <Text style={styles.username}>
//         {start ? `Date of Rapport: ${start.toString().slice(0, 25)}` : null}
//       </Text>

//       <TouchableOpacity onPress={() => setOpen(true)} style={styles.loginBtn}>
//         <Text style={styles.loginText}>Choose date and time of Rapport</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setOpen(true)} style={styles.loginBtn}>
//         <Text style={styles.loginText}>Choose end time of Rapport</Text>
//       </TouchableOpacity>

//       <DatePicker
//         modal
//         open={open}
//         date={start}
//         onConfirm={date => {
//           setOpen(false);
//           setStart(date);
//         }}
//         onCancel={() => setOpen(false)}
//       />

//       <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
//         <Text style={styles.loginText}>Edit Communication</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const mapDispatch = dispatch => {
//   return {
//     createComm: newComm => dispatch(_createComm(newComm)),
//   };
// };

// export default connect(null, mapDispatch)(EditCommunication);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   image: {
//     marginBottom: 40,
//   },

//   inputView: {
//     backgroundColor: '#FFC0CB',
//     borderRadius: 30,
//     width: '70%',
//     height: 45,
//     marginBottom: 20,

//     // alignItems: 'center',
//   },

//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//     alignItems: 'center',
//   },

//   loginBtn: {
//     width: '80%',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     marginBottom: 10,
//     backgroundColor: '#FF1493',
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });
