import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {_fetchComm} from '../Redux';

class RapportCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communications: [],
    };
  }

  componentDidMount() {
    this.props.fetchComm();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comm !== this.props.comm) {
      this.setState({communications: this.props.comm});
    }
  }

  render() {
    const {communications} = this.state;
    if (!communications.length) {
      return null;
    }
    console.log(communications);
    return (
      <SafeAreaView style={styles.container}>
        <Calendar events={communications} mode="month" height={600} />
      </SafeAreaView>
    );
  }
}

const mapState = state => {
  return {
    comm: state.comm,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchComm: () => dispatch(_fetchComm()),
  };
};

export default connect(mapState, mapDispatch)(RapportCalendar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
