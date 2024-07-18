// import React from "react";
import NavBarUser from "../components/navbar";
import Option from "../components/option";
import children from "../assets/children.png";
import saison from "../assets/saison.png";
import archive from "../assets/archive.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    
    return (
        <div className="h-[100vh] flex flex-col justify-between">
            <NavBarUser/>
            <div className="h-[85%]  flex flex-col justify-evenly items-center ">
                <h1 className="text-4xl text-myblue font-bold ">Choisissez ce que vous voulez faire</h1>
                <div className="h-[80%] w-[100%] flex flex-row justify-evenly items-center">
                    {/* here we display the different options */}
                    <Option image={children} color={"myblue"} description={"Gérer l’ensemble des enfants"} title={"Enfants"} onClick={()=>{navigate('/children')}}/>
                    <Option image={saison} color={"myorange"} description={"Gérer la saison actuelle"} title={"Saison"} onClick={()=>{}}/>
                    <Option  image={archive} color={"myyellow"} description={"voir l’archive des saisons"} title={"Archive"} onClick={()=>{console.log("archive")}}/>
                </div>
            </div>
        </div>
    );
}