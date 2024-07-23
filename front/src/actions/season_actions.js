import {addChildToSeason, updateSeason, updateChildInSeason,createSeason ,removeChildFromSeason , updateErrorSeason } from "../slices/season_slice";
import {api, deleteToken} from "../utils/api"

// Fetch initial 
export const fetchSeason = () => async (dispatch) => {
  try {
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
    console.log(error);
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

// Create a new season
export const createNewSeason = (date_debut, date_fin) => async (dispatch) => {
  try {
    console.log(date_debut, date_fin);
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
  } catch (error) {
    console.log(error);
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

//remove child from a season 
export const removeChild = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/saison/enfants/${id}`);
    dispatch(removeChildFromSeason({ id }));
  } catch (error) {
    console.log(error);
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

export const addChild = (child) => async (dispatch) => {
  try {
    var data = {
      "groupe": child.groupe,
      "transport": child.transport
    }
    await api.post(`/api/saison/enfants/${child.id}`, JSON.stringify(data));
    dispatch(addChildToSeason(child));
  } catch (error) {
    console.log(error);
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
}

export const updateChild = (child) => async (dispatch) => {
  try {
    var data = {
      "transport": child.transport,
      "groupe": child.groupe
    }
    await api.put(`/api/saison/enfants/${child.id}`, JSON.stringify(data));
    dispatch(updateChildInSeason(child));
  } catch (error) {
    console.log(error);
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
}