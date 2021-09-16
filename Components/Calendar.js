import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { resetContacts, getContacts } from "../redux/contacts";
import { _fetchUser } from "../redux/user";
import { connect } from "react-redux";
import Unauthorized from "./Unauthorized";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      contacts: [],
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userName);
  }

  componentWillUnmount() {
    this.props.resetContacts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      this.setState({
        contacts: this.props.contacts,
      });
    }

    if (prevProps.user !== this.props.user) {
      if (this.props.user.id) {
        this.props.getContacts(this.props.user.id);
      }

      this.setState({
        user: this.props.user,
      });
    }
  }

  eventClickHandler(ev) {
    // here we return the component for the event page
    const route = `/user/${this.props.match.params.userName}/${ev.event.id}`;
    this.props.history.push(route);
  }

  render() {
    if (this.props.message === "Unauthorized") {
      return <Unauthorized />;
    }
    const events = [...this.state.contacts];

    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={(ev) => {
          this.eventClickHandler(ev);
        }}
        events={this.state.contacts}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    user: state.user,
    message: state.authMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: (userId) => dispatch(getContacts(userId)),
    resetContacts: () => dispatch(resetContacts()),
    fetchUser: (username) => dispatch(_fetchUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
