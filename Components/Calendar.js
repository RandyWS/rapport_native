import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {_fetchComm} from '../Redux';

class RapportCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communications: [],
    };
    this.renderEvent = this.renderEvent.bind(this);
  }

  componentDidMount() {
    this.props.fetchComm();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comm !== this.props.comm) {
      this.setState({communications: this.props.comm});
    }
  }

  renderEvent = (
    event: ICalendarEvent<T>,
    touchableOpacityProps: CalendarTouchableOpacityProps,
  ) => {
    return (
      <TouchableOpacity style={styles.box} {...touchableOpacityProps}>
        <Image
          style={styles.image}
          source={{
            uri: event.imageUrl,
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {communications} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          eventCellStyle={{backgroundColor: 'transparent'}}
          events={communications}
          renderEvent={this.renderEvent}
          mode="month"
          height={600}
          onPressEvent={event => {
            console.log(event);
            this.props.navigation.navigate('Rapport', {
              screen: 'Communication',
              params: {
                commId: event.id,
              },
            });
          }}
        />
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
    backgroundColor: '#fbfbf2',
  },
  image: {
    width: 50,
    height: 50,
  },
  box: {
    justifyContent: 'center',
  },
});
