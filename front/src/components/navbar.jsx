import React from 'react';
import logo from '../assets/logo_v2.png';
import { useNavigate , useLocation } from 'react-router-dom';

const NavBarUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigate = (path) => {
        if (location.pathname !== path) {
          navigate(path);
        }
    };
    return (
        <nav className="flex items-center justify-around p-4 h-[15%]">
            <img src={logo} alt="Logo" className="w-[20%] h-[100%]" />
            <div className="flex flex-row justify-evenly items-center w-[55%]">
                <button onClick={()=>handleNavigate('/children')} className="text-black font-bold text-lg tracking-wide hover:text-gray-300 border-b-2  border-myblue pb-2">Enfants</button>
                <button onClick={()=>handleNavigate("/season")} className="text-black font-bold text-lg tracking-wide hover:text-gray-300 border-b-2  border-myorange pb-2">Saison</button>
                <button className="text-black font-bold text-lg tracking-wide hover:text-gray-300 border-b-2 border-myyellow pb-2">Archive</button>
            </div>
        </nav>
    );
};

export default NavBarUser;
