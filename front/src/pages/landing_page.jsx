// import React from "react";
import NavBarUser from "../components/navbar";
import Option from "../components/option";
import children from "../assets/children.png";
import saison from "../assets/saison.png";
import archive from "../assets/archive.png";
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSeason } from "../actions/season_actions";
import { fetchChildren } from "../actions/children_actions";
import { createNewSeason } from "../actions/season_actions";
import { useState } from "react";
import CreateSeason from "../components/create_season";
import { useSelector } from "react-redux";

export default function LandingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const season = useSelector((state) => state.season);
    const [isCreateSeason, setIsCreateSeason] = useState(false);
    const handleCreateClick = () => {
        setIsCreateSeason(true);
    };
    const handleCloseCreate = () => {
        setIsCreateSeason(false);
    };
    const handleCreateSeason = (seasonData) => {
        dispatch(createNewSeason(seasonData.date_debut, seasonData.date_fin));
    };
    const location = useLocation();
    const handleNavigate = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    useEffect(() => {
        dispatch(fetchChildren());
        dispatch(fetchSeason());
    }, [dispatch]);
    
    return (
        <div className="h-[100vh] flex flex-col justify-between">
            <NavBarUser openCreateSeason={handleCreateClick} />
            <div className="h-[85%]  flex flex-col justify-evenly items-center ">
                <h1 className="text-4xl text-myblue font-bold ">Choisissez ce que vous voulez faire</h1>
                <div className="h-[80%] w-[100%] flex flex-row justify-evenly items-center">
                    {/* here we display the different options */}
                    <Option image={children} color={"myblue"} description={"Gérer l’ensemble des enfants"} title={"Enfants"} onClick={()=>{handleNavigate('/children')}}/>
                    <Option image={saison} color={"myorange"} description={"Gérer la saison actuelle"} title={"Saison"} onClick={()=>{
                        if(season.date_debut){
                            handleNavigate('/season');
                        }else{
                            handleCreateClick();  
                        }
                         }}/>
                    <Option  image={archive} color={"myyellow"} description={"voir l’archive des saisons"} title={"Archive"} onClick={()=>{handleNavigate('archive')}}/>
                </div>
            </div>
            {!isCreateSeason || (
                <div>
                    <CreateSeason
                        isOpen={isCreateSeason}
                        onClose={handleCloseCreate}
                        onAdd={handleCreateSeason}
                    />
                </div>
            )}
        </div>
    );
}