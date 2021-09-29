import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-big-calendar';

const RapportCalendar = () => {
  const events = [
    {
      title: 'Meeting',
      start: new Date(2021, 9, 30, 10, 0),
      end: new Date(2020, 10, 11, 10, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 10, 2, 15, 45),
      end: new Date(2021, 10, 2, 16, 30),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Calendar events={events} mode="month" height={600} />
    </SafeAreaView>
  );
};

export default connect(null, null)(RapportCalendar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 85,
  },
});
