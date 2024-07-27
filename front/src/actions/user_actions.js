import { setUser, clearUser , setError } from '../slices/user_slice';
import {api,deleteToken} from "../utils/api"


export const loginUser = (username, password) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    var response = await api.post(
      '/api/auth/login', 
      JSON.stringify(
        {
          username,
          password
        }
      )
    );
      
    const { token } = response.data;
    // const token = 'mock_token';
    localStorage.setItem('token', token);
    // Mettre à jour le state Redux
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    dispatch(setUser({ username }));
  } catch (error) {
    console.error(error);
    dispatch(setError({ error: "Nom d'utilisateur ou mot de passe incorrect" }));

    switch(error.response?.status){
      case 403:
        dispatch(setError({ error: "Nom d'utilisateur ou mot de passe incorrect" }));
        // deleteToken();
        break ;
      case 401:
        dispatch(setError({ error: "Nom d'utilisateur ou mot de passe incorrect" }));
        // deleteToken();
        break;
      case 500:
        dispatch(setError({ error: "Nom d'utilisateur ou mot de passe incorrect" }));
        break;
      default:
        break ;
    }
  }
};

// export const logoutUser = () => (dispatch) => {
//   localStorage.removeItem('token');
//   dispatch(clearUser());
// };
  
export const validateToken = (token) => async (dispatch) => {
  try {
    const  username  = "admin";
    dispatch(setUser({ username }));

  } catch (error) {
    dispatch(clearUser());
    localStorage.removeItem('token');
  }
};