import { addChild, loadChildren, removeChild, updateChild } from '../slices/children_slice';
import { removeChildFromSeason, updateChildInSeason } from '../slices/season_slice';
import {api, deleteToken} from "../utils/api"

// Fetch initial children
export const fetchChildren = () => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await api.get('/api/enfants');
    const children = response.data; // here get a List of children 
    dispatch(loadChildren(children));
    
  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        deleteToken();
        break ;
      case 401:
        deleteToken();
        break;
      case 500:
        break;
      default:
        break ;
    }
  }
};

// Add a child
export const addChildToDB = ({formData}) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await api.post('/api/enfants', 
      JSON.stringify(formData)
    );
    const newChild = response.data;
    dispatch(addChild(newChild));
  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        deleteToken();
        break ;
      case 401:
        deleteToken();
        break;
      case 500:
        break;
      default:
        break ;
    }
  }
};

// Update a child
export const updateChildInDB = (formData) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const response = await api.put(`/api/enfants/${formData.id}`, JSON.stringify(formData));
    
    const updatedChild = response.data;
    dispatch(updateChild(updatedChild));
    dispatch(updateChildInSeason(updatedChild));
    
  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        deleteToken();
        break ;
      case 401:
        deleteToken();
        break;
      case 500:
        break;
      default:
        break ;
    }
  }
};

// Remove a child
export const removeChildFromDB = (id) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const response = await api.delete(`/api/enfants/${id}`);
    dispatch(removeChildFromSeason({id}));
    dispatch(removeChild({id}));
  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        deleteToken();
        break ;
      case 401:
        deleteToken();
        break;
      case 500:
        break;
      default:
        break ;
    }
  }
};
