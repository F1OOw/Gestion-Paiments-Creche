import { addChild, removeChild, updateChild } from '../slices/children_slice';
import {api, deleteToken} from "../utils/api"

// Fetch initial children
export const fetchChildren = () => async (dispatch) => {
  try {
    console.log("yooooooooo");
    const response = await api.get('/api/enfants');
    const children = response.data; // here get a List of children 
    children.forEach(child => {
      dispatch(addChild(child));
    });
  } catch (error) {
    switch(error.response?.status){
      case 403:
      case 401:
        deleteToken();
        console.error('Erreur lors de la récupération des enfants:', error);
        break;
      case 500:
        console.error('Erreur lors de la récupération des enfants:', error);
        break;
      default:
        console.error('Erreur lors de la récupération des enfants:', error);
        break ;
    }
  }
};

// Add a child
export const addChildToDB = ({formData}) => async (dispatch) => {
  try {
    console.log(formData);  
    const response = await api.post('/api/enfants', 
      JSON.stringify(formData)
    );
    const newChild = response.data;
    dispatch(addChild(formData.formData));
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'enfant:', error);
  }
};

// Update a child
export const updateChildInDB = (formData) => async (dispatch) => {
  try {
    const response = await axios.put(`apitoupdate/${formData.id}`, formData);
    const updatedChild = response.data;
    dispatch(updateChild(updatedChild));
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'enfant:', error);
  }
};

// Remove a child
export const removeChildFromDB = (id) => async (dispatch) => {
  try {
    await axios.delete(`apiTodelete/${id}`);
    dispatch(removeChild({ id }));
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enfant:', error);
  }
};
