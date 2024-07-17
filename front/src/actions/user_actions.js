import axios from 'axios';
import { setUser, clearUser } from '../slices/user_slice';

export const loginUser = (username, password) => async (dispatch) => {
  console.log(username, password);
  try {
    // const response = await axios.post('URL_DE_VOTRE_API/login', {
    //   username,
    //   password,
    // });
    // const { token } = response.data;
    const token = 'mock_token';
    localStorage.setItem('token', token);
    console.log("token", localStorage.getItem('token'));
    // Mettre à jour le state Redux
    dispatch(setUser({ username }));
  } catch (error) {
    console.error('Erreur de login:', error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(clearUser());
};
  
export const validateToken = (token) => async (dispatch) => {
  try {
    // const response = await axios.post('api', { token });
    // const  username  = response.data;
    const  username  = "response.data";
    console.log("token", token);
    dispatch(setUser({ username }));
  } catch (error) {
    console.error('Invalid token:', error);
    dispatch(clearUser());
    localStorage.removeItem('token');
  }
};