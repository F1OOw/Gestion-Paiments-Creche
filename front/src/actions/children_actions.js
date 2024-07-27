import { addChild, loadChildren, removeChild, updateChild } from '../slices/children_slice';
import { setNotification } from '../slices/notification_slice';
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
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break ;
      case 401:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
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
    dispatch(setNotification({message: "Enfant ajouté avec succés",isError: false}))
  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break ;
      case 401:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
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
    dispatch(setNotification({message: "Modification effectuée avec succés",isError: false}));
    
  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break ;
      case 401:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
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
    dispatch(setNotification({message: "Suppression effectuée avec succés",isError: false}));

  } catch (error) {
    console.error(error);
    switch(error.response?.status){
      case 403:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break ;
      case 401:
        dispatch(setNotification({message: "Session expirée",isError: true}))
        deleteToken();
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
};
