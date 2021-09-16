import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerItems from './DrawerItems';

const Drawer = createDrawerNavigator();

class Navbar extends Component {
  constructor() {
    super();
    // this.state = {
    //   loggedIn: false,
    // };
    // this.logOut = this.logOut.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.loggedIn !== this.props.loggedIn) {
  //     this.setState({loggedIn: this.props.loggedIn.loggedIn});
  //   }
  // }

  // logOut(ev) {
  //   ev.preventDefault();
  //   this.props.logOut();
  // }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="front"
          initialRouteName="LogIn"
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 10},
          }}>
          {DrawerItems.map(drawer => (
            <Drawer.Screen key={drawer.name} name={drawer.name} />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     loggedIn: state.loggedIn,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     logOut: () => dispatch(_logOut()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);