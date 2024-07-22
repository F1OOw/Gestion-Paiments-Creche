import { addChild, removeChild, updateChild } from '../slices/children_slice';
import {api, deleteToken} from "../utils/api"

// Fetch initial children
export const fetchChildren = () => async (dispatch) => {
  try {
    const response = await api.get('/api/enfants');
    const children = response.data; // here get a List of children 
    children.forEach(child => {
      dispatch(addChild(child));
    });
  } catch (error) {
    console.log(error);
    switch(error.response?.status){
      case 403:
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
    const response = await api.post('/api/enfants', 
      JSON.stringify(formData)
    );
    const newChild = response.data;
    dispatch(addChild(formData.formData));
  } catch (error) {
    console.log(error);
    switch(error.response?.status){
      case 403:
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
    console.log(formData);
    const response = await api.put(`/api/enfants/${formData.id}`, JSON.stringify(formData));
    
    const updatedChild = response.data;
    dispatch(updateChild(updatedChild));
    
  } catch (error) {
    console.log(error);
    switch(error.response?.status){
      case 403:
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
    const response = await api.delete(`/api/enfants/${id}`);
    dispatch(removeChild({ id }));
  } catch (error) {
    console.log(error);
    switch(error.response?.status){
      case 403:
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
