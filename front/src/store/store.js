// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../slices/user_slice';


// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     children: childrenReducer,
//     season : seasonReducer, 
//   },
// });

// // const token = localStorage.getItem('token');
// // if (token) {
// //   store.dispatch(setUser({ username: 'utilisateur_decodé' })); // Remplacez par la logique de décodage réelle
// // }

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user_slice';
import childrenReducer from '../slices/children_slice';
import seasonReducer from '../slices/seasonSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    children: childrenReducer,
    season : seasonReducer, 
  },
});

export default store;
