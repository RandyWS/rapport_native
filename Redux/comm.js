import axios from 'axios';
import deviceState from '../services/deviceState';

const SET_COMM = 'SET_COMM';
const RESET_COMM = 'RESET_COMM';

export const setComm = comm => {
  return {
    type: SET_COMM,
    comm,
  };
};

export const resetComm = () => {
  return {
    type: SET_COMM,
    contacts: [],
  };
};

export const _fetchComm = () => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.get(
          `http://192.168.86.32:8080/api/communications/`,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.length) {
          const communications = data.map(comm => {
            let start = new Date(comm.start);
            let end = new Date(comm.end);
            comm.start = start;
            comm.end = end;
            return comm;
          });
          dispatch(setComm(communications));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _createRecurringComm = (comm, friendId) => {
  return async dispatch => {
    try {
      console.log(comm.time);
      // comm.time = comm.time.toISOString();
      console.log('comm', comm);
      console.log('friendId', friendId);
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.post(
          `http://192.168.86.32:8080/api/communications/recurring/${friendId}`,
          comm,
          {
            headers: {
              authorization: token,
            },
          },
        );

        console.log('recurring comm', data);

        // if (data.newCommunication) {
        //   dispatch(setComm(data.newCommunication));
        // }
      }
    } catch (error) {
      console.log('_Create Communication Error: ' + error);
    }
  };
};

// export const _getEvents = (
//   start = new Date().getTime(),
//   end = new Date().getTime() + 1000 * 60 * 60,
// ) => {
//   return async dispatch => {
//     try {
//       const token = await deviceState.getJWT();

//       if (token) {
//         const {data} = await axios.get(
//           `http://192.168.86.32:8080/api/communications/`,
//           {
//             headers: {
//               authorization: token,
//             },
//           },
//         );
//         console.log('data is: ', data);
//         if (data.length) {
//           dispatch(setComm(data));
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export default (state = [], action) => {
  switch (action.type) {
    case SET_COMM:
      return action.comm;
    case RESET_COMM:
      return action.comm;
    default:
      return state;
  }
};
