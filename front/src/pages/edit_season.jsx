// import React from "react";
import NavBarUser from "../components/navbar";
import SettingOption from "../components/setting_option";
import children from "../assets/Children-rafiki.png";
import calender from "../assets/calender.png";
import rafiki from "../assets/rafiki.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditSeason() {
    const navigate = useNavigate();
    const season = useSelector((state) => state.season);
    console.log(season.enfants);
    const childrenNumber = season.enfants.length;
    return (
        <div className="h-[100vh] flex flex-col justify-between">
            <NavBarUser/>
            <div className="h-[85%]  flex flex-col justify-evenly items-center ">
                <h1 className="text-4xl text-myblue font-bold ">Voici les paramétres de la saison actuelle :</h1>
                <div className="h-[75%] w-[100%] flex flex-row justify-evenly items-center">
                    {/* here we display the different options */}
                    <SettingOption image={calender} color={"myblue"} description={season.date_debut} title={"Date début de la saison :"} />
                    <SettingOption image={rafiki} color={"myorange"} description={season.date_fin} title={"Date fin de la saison :"} />
                    <SettingOption  image={children} color={"myyellow"} description={childrenNumber} title={"Nombre d’enfants inscrits :"} />
                </div>
                <div className="flex flex-row  w-[60%] justify-evenly">
                    <button 
                    className="bg-myorange text-white px-6 py-2 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl">Supprimer</button>
                    <button 
                    className="bg-myyellow text-white px-6 py-2 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl">Archiver</button>
                 </div>
            </div>
        </div>
    );
}