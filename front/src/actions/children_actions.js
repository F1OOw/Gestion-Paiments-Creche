import axios from 'axios';
import { addChild, removeChild, updateChild } from '../slices/children_slice';

// Fetch initial children
export const fetchChildren = () => async (dispatch) => {
//   try {
//     const response = await axios.get('api');
//     const children = response.data; // here get a List of children 
//     children.forEach(child => {
//       dispatch(addChild(child));
//     });
//   } catch (error) {
//     console.error('Erreur lors de la récupération des enfants:', error);
//   }
};

// Add a child
export const addChildToDB = (formData) => async (dispatch) => {
  try {
    // const response = await axios.post('apiToAddEnfant', formData);
    // const newChild = response.data;
    formData.formData.id = Math.floor(Math.random() * 1000);
    console.log(formData);  
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
    // await axios.delete(`apiTodelete/${id}`);
    dispatch(removeChild({ id }));
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enfant:', error);
  }
};
