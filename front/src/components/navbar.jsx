import { useState } from 'react';
import logo from '../assets/logo_v2.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNewSeason } from "../actions/season_actions";
import CreateSeason from './create_season'; 

const NavBarUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const season = useSelector(state => state.season);

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


    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };
    
    const handleNavigate = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    return (
        <nav className="flex items-center justify-around p-4 h-[15%] relative">
            <img src={logo} alt="Logo" className="w-[20%] h-[100%]" />
            <div className="flex flex-row justify-evenly items-center w-[55%]">
                <button onClick={() => handleNavigate('/children')} className="text-black font-bold text-lg tracking-wide hover:text-gray-300 border-b-2 border-myblue pb-2">
                    Enfants
                </button>
                <div className="relative">
                    <button onClick={()=>{
                        if(season.date_debut){
                            toggleDropdown(); 
                        }else{
                            handleCreateClick();  
                        }
                    }} className="text-black font-bold text-lg tracking-wide hover:text-gray-300 border-b-2 border-myorange pb-2">
                        Saison
                    </button>
                    {isDropDownOpen && (
                        <div className="absolute mt-2 w-48 bg-white rounded shadow-lg border border-t-0 border-myorange">
                            <button onClick={()=>navigate('/season')} className="block text-center w-full px-4 py-2 text-black font-bold hover:bg-gray-200">
                                Enfants Inscrits
                            </button>
                            <button className="block text-center w-full px-4 py-2 text-black font-bold hover:bg-gray-200">
                                État des Paiements
                            </button>
                            <button className="block text-center w-full px-4 py-2 text-black font-bold hover:bg-gray-200">
                                Paramètres
                            </button>
                        </div>
                    )}
                </div>
                <button className="text-black font-bold text-lg tracking-wide hover:text-gray-300 border-b-2 border-myyellow pb-2">
                    Archive
                </button>
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
        </nav>
    );
};

export default NavBarUser;
