import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {_fetchComm, resetComm} from '../Redux';

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

  componentWillUnmount() {
    this.setState({communications: []});
    this.props.resetComm();
  }

  renderEvent = (event, touchableOpacityProps) => {
    console.log(touchableOpacityProps);
    return (
      <TouchableOpacity
        // onPress={event => {
        //   console.log(event);
        //   this.props.navigation.navigate('Rapport', {
        //     screen: 'Communication',
        //     params: {
        //       commId: event.id,
        //     },
        //   });
        // }}
        style={styles.box}
        {...touchableOpacityProps}>
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
    console.log('comm', communications);

    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          eventCellStyle={{backgroundColor: 'transparent'}}
          events={communications}
          renderEvent={this.renderEvent}
          mode="month"
          keyExtractor={item => item.id.toString()}
          height={600}
          onPress={event => {
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
    resetComm: () => dispatch(resetComm()),
  };
};

export default connect(mapState, mapDispatch)(RapportCalendar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbf2',
  },
  image: {
    width: 45,
    height: 45,
  },
  box: {
    justifyContent: 'center',
  },
});
