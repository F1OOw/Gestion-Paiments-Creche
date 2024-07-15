import axios from 'axios';
import { setUser, clearUser } from '../slices/user_slice';

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('URL_DE_VOTRE_API/login', {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);

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
  