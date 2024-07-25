import axios from "axios";
import {addChildToSeason, removeSeason, updateChildInSeason,createSeason ,removeChildFromSeason , updateErrorSeason } from "../slices/season_slice";

// Fetch initial 
export const fetchSeason = () => async (dispatch) => {
  try {
    // const response = await axios.get("/api/saison"); //connaitre si il y'a une saison actuelle
    // const seasonInfo = response.data; 
    const seasonInfo = {
      id: 1,
      date_debut: "2021-09-01",
      date_fin: "2022-06-30",
    }; 
    const season = {
      id: seasonInfo.id,
      date_debut: seasonInfo.date_debut,
      date_fin: seasonInfo.date_fin,
    };
    // const responseChildren = await axios.get(`/api/saison/enfants`); //recuperer les enfants de la saison
    // const enfants = responseChildren.data;
    // season.enfants = enfants;
    // const responseGroupes = await axios.get(`/api/saison/groupes`); //recuperer les groupes de la saison
    // const groupes = responseGroupes.data;
    const groupes = [1,2,3,4,5]; 
    season.groupes = groupes;
    season.enfants = [
      {
          "id_saison": 1,
          "id": 1,
          "nom": "Dupont",
          "prenom": "Jean",
          "date_naissance": "01-01-2024",
          "nom_tuteur": "Dupont",
          "prenom_tuteur": "Pierre",
          "tel_tuteur": "0677777777",
          "email_tuteur": "pierre.dupont@exemple.com",
          "adresse": "12 Rue de Paris, Paris",
          "groupe": 1,
          "transport": true
      },
      {
          "id_saison": 1,
          "id": 2,
          "nom": "Martin",
          "prenom": "Marie",
          "date_naissance": "02-02-2024",
          "nom_tuteur": "Martin",
          "prenom_tuteur": "Sophie",
          "tel_tuteur": "0677777778",
          "email_tuteur": "sophie.martin@exemple.com",
          "adresse": "34 Avenue des Champs, Lyon",
          "groupe": 1,
          "transport": false
      },
      {
          "id_saison": 1,
          "id": 3,
          "nom": "Bernard",
          "prenom": "Louis",
          "date_naissance": "03-03-2024",
          "nom_tuteur": "Bernard",
          "prenom_tuteur": "Claude",
          "tel_tuteur": "0677777779",
          "email_tuteur": "claude.bernard@exemple.com",
          "adresse": "56 Boulevard Saint-Michel, Marseille",
          "groupe": 2,
          "transport": true
      },
      {
          "id_saison": 1,
          "id": 4,
          "nom": "Dubois",
          "prenom": "Lucie",
          "date_naissance": "04-04-2024",
          "nom_tuteur": "Dubois",
          "prenom_tuteur": "Isabelle",
          "tel_tuteur": "0677777780",
          "email_tuteur": "isabelle.dubois@exemple.com",
          "adresse": "78 Rue de la Liberté, Lille",
          "groupe": 2,
          "transport": false
      },
      {
          "id_saison": 1,
          "id": 5,
          "nom": "Durand",
          "prenom": "Paul",
          "date_naissance": "05-05-2024",
          "nom_tuteur": "Durand",
          "prenom_tuteur": "Henri",
          "tel_tuteur": "0677777781",
          "email_tuteur": "henri.durand@exemple.com",
          "adresse": "90 Rue du Faubourg, Bordeaux",
          "groupe": 3,
          "transport": true
      },
      {
          "id_saison": 1,
          "id": 6,
          "nom": "Moreau",
          "prenom": "Julie",
          "date_naissance": "06-06-2024",
          "nom_tuteur": "Moreau",
          "prenom_tuteur": "Valérie",
          "tel_tuteur": "0677777782",
          "email_tuteur": "valerie.moreau@exemple.com",
          "adresse": "12 Allée des Acacias, Nantes",
          "groupe": 3,
          "transport": false
      },
      {
          "id_saison": 1,
          "id": 7,
          "nom": "Lefevre",
          "prenom": "Pierre",
          "date_naissance": "07-07-2024",
          "nom_tuteur": "Lefevre",
          "prenom_tuteur": "Jean",
          "tel_tuteur": "0677777783",
          "email_tuteur": "jean.lefevre@exemple.com",
          "adresse": "34 Rue de la République, Strasbourg",
          "groupe": 4,
          "transport": true
      },
      {
          "id_saison": 1,
          "id": 8,
          "nom": "Garcia",
          "prenom": "Laura",
          "date_naissance": "08-08-2024",
          "nom_tuteur": "Garcia",
          "prenom_tuteur": "Maria",
          "tel_tuteur": "0677777784",
          "email_tuteur": "maria.garcia@exemple.com",
          "adresse": "56 Avenue de la Gare, Toulouse",
          "groupe": 4,
          "transport": false
      },
      {
          "id_saison": 1,
          "id": 9,
          "nom": "Martinez",
          "prenom": "Hugo",
          "date_naissance": "09-09-2024",
          "nom_tuteur": "Martinez",
          "prenom_tuteur": "Carlos",
          "tel_tuteur": "0677777785",
          "email_tuteur": "carlos.martinez@exemple.com",
          "adresse": "78 Rue de la Mer, Nice",
          "groupe": 5,
          "transport": true
      },
      {
          "id_saison": 1,
          "id": 10,
          "nom": "Lopez",
          "prenom": "Emma",
          "date_naissance": "10-10-2024",
          "nom_tuteur": "Lopez",
          "prenom_tuteur": "Ana",
          "tel_tuteur": "0677777786",
          "email_tuteur": "ana.lopez@exemple.com",
          "adresse": "90 Rue des Fleurs, Rennes",
          "groupe": 5,
          "transport": false
      }
  ];
    dispatch(createSeason(season));

  } catch (error) {
    console.error("Erreur lors de la récupération des saisons:", error);
  }
};

// Create a new season
export const createNewSeason = (date_debut, date_fin) => async (dispatch) => {
  try {
    console.log(date_debut, date_fin);
    // const response = await axios.post("/api/saison")//we send request with the two date;
    // const season = response.data;
    // const responseGroupes = await axios.get(`/api/saison/groupes`); //recuperer les groupes de la saison
    // const groupes = responseGroupes.data;
    const season = {
      id: 2,
      date_debut: date_debut,
      date_fin: date_fin,
      enfants: [],
      // groupes: groupes,
    };
    const seasonInfo = {
      id: season.id,
      date_debut: season.date_debut,
      date_fin: season.date_fin,
      enfants: [],
      // groupes: groupes,
    };
    dispatch(createSeason(season));
  } catch (error) {
    console.error("Erreur lors de la création de la saison:", error);
  }
};

//remouve child from a season 
export const removeChild = (id) => async (dispatch) => {
  try {
    // await axios.delete(`api`);
    dispatch(removeChildFromSeason({ id }));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'enfant de la saison:", error);
  }
};

export const addChild = (child) => async (dispatch) => {
  try {
    // await axios.post(`api`, child);
    dispatch(addChildToSeason(child));
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'enfant à la saison:", error);
  }
}

export const updateChild = (child) => async (dispatch) => {
  try {
    // await axios.put(`api`, child);
    dispatch(updateChildInSeason(child));
  } catch (error) {
    console.error("Erreur lors de la modification de l'enfant de la saison:", error);
  }
}

export const deleteSeason = () => async (dispatch) => {
  try {
    // await axios.delete(`api`);
    dispatch(removeSeason());
  } catch (error) {
    console.error("Erreur lors de la suppression de la saison:", error);
  }
};

export const archiveSeason = () => async (dispatch) => {
  try {
    // await axios.put(`api`);
    dispatch(removeSeason());
  } catch (error) {
    console.error("Erreur lors de l'archivage de la saison:", error);
  }
}