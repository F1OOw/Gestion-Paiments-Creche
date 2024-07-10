import React from "react";
import NavBar from "../components/nav_bar";
import OptionCard from "../components/option_card";
import children from "../assets/children.png";
import saison from "../assets/saison.png";
import archive from "../assets/archive.png";

export default function LandingPage() {
    
    return (
        <div className="h-[100vh] flex flex-col justify-between">
            <NavBar/>
            <div className="h-[85%]  flex flex-col justify-evenly items-center ">
                <h1 className="text-4xl text-myblue font-bold ">Choisissez ce que vous voulez faire</h1>
                <div className="h-[80%] w-[100%] flex flex-row justify-evenly items-center">
                    {/* here we display the different options */}
                    <OptionCard image={children} color={"myblue"} description={"Gérer l’ensemble des enfants"} title={"Enfants"} onClick={()=>{console.log("enfants")}}/>
                    <OptionCard image={saison} color={"myorange"} description={"Gérer la saison actuelle"} title={"Saison"} onClick={()=>{console.log("saison")}}/>
                    <OptionCard image={archive} color={"myyellow"} description={"voir l’archive des saisons"} title={"Archive"} onClick={()=>{console.log("archive")}}/>
                </div>
            </div>
        </div>
    );
}