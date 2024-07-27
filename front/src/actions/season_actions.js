import { setNotification } from "../slices/notification_slice";
import {addChildToSeason, removeSeason, updateSeason, updateChildInSeason,createSeason ,removeChildFromSeason , updateErrorSeason } from "../slices/season_slice";
import {api, deleteToken} from "../utils/api"

// Fetch initial 
export const fetchSeason = () => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const response = await api.get("/api/saison"); //connaitre si il y'a une saison actuelle
    const season = response.data; 
    
    const responseChildren = await api.get(`/api/saison/enfants`); //recuperer les enfants de la saison
    const enfants = responseChildren.data;
    season.enfants = enfants;
    const responseGroupes = await api.get(`/api/saison/groupes`); //recuperer les groupes de la saison
    const groupes = responseGroupes.data['groupes'];
    season.groupes = groupes;
    
    dispatch(createSeason(season));


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
      case 404:
        dispatch(setNotification({message: "Pas de saison actuelle", isError: true}))
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
};

// Create a new season
export const createNewSeason = (date_debut, date_fin) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    var data = {
      date_debut,
      date_fin
    } ;
    const response = await api.post("/api/saison",JSON.stringify(data)) ;//we send request with the two date;
    const season = response.data;
    const responseGroupes = await api.get(`/api/saison/groupes`); //recuperer les groupes de la saison
    const groupes = responseGroupes.data['groupes'];
    season.groupes = groupes;
    season.enfants = [] ;

    dispatch(createSeason(season));
    dispatch(setNotification({message: "Saison Crée avec Succées",isError: false}))

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
      case 400:
        dispatch(setNotification({message: "Données Incohérentes", isError: true}))
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
};

//remove child from a season 
export const removeChild = (id) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    await api.delete(`/api/saison/enfants/${id}`);
    dispatch(removeChildFromSeason({ id }));
    dispatch(setNotification({message: "Enfant supprimé de la saison",isError: false}))

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
      case 404:
        dispatch(setNotification({message: "Pas de saison actuelle", isError: true}))
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
};

export const addChild = (child) => async (dispatch) => {
  try {
    var data = {
      "groupe": child.groupe,
      "transport": child.transport
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    await api.post(`/api/saison/enfants/${child.id}`, JSON.stringify(data));
    dispatch(addChildToSeason(child));
    dispatch(setNotification({message: "Enfant inscrit avec succes",isError: false}))

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
      case 404:
        dispatch(setNotification({message: "Pas de saison actuelle", isError: true}))
        break;
      case 409:
          dispatch(setNotification({message: "Enfant déja inscrit", isError: true}))
          break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
}

export const updateChild = (child) => async (dispatch) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    var data = {
      "transport": child.transport,
      "groupe": child.groupe
    }
    await api.put(`/api/saison/enfants/${child.id}`, JSON.stringify(data));
    dispatch(updateChildInSeason(child));
    dispatch(setNotification({message: "Mofifications effectuées avec succes",isError: false}))

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
      case 404:
        dispatch(setNotification({message: "Pas de saison actuelle", isError: true}))
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
}

export const deleteSeason = () => async (dispatch) => {
  try {
    await api.delete("/api/saison");
    dispatch(removeSeason());
    dispatch(setNotification({message: "Saison Supprimée avec Succes",isError: false}))

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
      case 404:
        dispatch(setNotification({message: "Pas de saison actuelle", isError: true}))
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
};

export const archiveSeason = () => async (dispatch) => {
  try {
    await api.get("/api/saison/archive");
    dispatch(removeSeason());
    dispatch(setNotification({message: "Saison archivée avec Succées",isError: false}))

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
      case 404:
        dispatch(setNotification({message: "Pas de saison actuelle", isError: true}))
        break;
      case 500:
        dispatch(setNotification({message: "Erreur du serveur", isError: true}))
        break;
      default:
        break ;
    }
  }
}