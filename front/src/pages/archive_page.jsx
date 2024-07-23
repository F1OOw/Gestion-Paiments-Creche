import React, { useEffect , useState } from "react";
import NavBarUser from "../components/navbar";
import { FaSearch } from 'react-icons/fa';

const ArchivePage = () => {
    const archive = []; 
    archive.push({
        id: 1,
        date_debut: "2021-09-01",
        date_fin: "2022-06-30",
    }); 
    useEffect(() => {
        // fetch archive data
    }, archive);

    const [filter, setFilter] = useState('');
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filtredArchive = archive.filter(child =>
        child
        // (child.nom.toLowerCase()+" "+child.prenom.toLowerCase()).includes(filter.toLowerCase()) 
        // || (child.prenom.toLowerCase()+" "+child.nom.toLowerCase()).includes(filter.toLowerCase()) 
    );
    return (
         <div>
            <NavBarUser/>
            <div className="flex flex-col items-center">
                <div className="h-[10vh] w-[90%] flex flex-row justify-around items-center">
                    <h1 className="text-3xl text-myblue font-bold">Liste des archives :</h1>
                    <div className="w-[20%]"></div>
                    <div className="relative w-[35%] z-0">
                        <input
                            type="text"
                            placeholder="Introduisez une date ... "
                            className="w-full border-2 border-myyellow rounded-3xl py-2 px-4 focus:outline-none focus:border-myyellow"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-myorange" />
                    </div>
                </div>
                <div className="w-[90%]">
                    <div className="h-[10vh] w-[100%] flex flex-row ---sticky top-0 ---z-10">
                        <div className="h-[100%] w-[20%] bg-myyellow rounded-tl-3xl flex items-center justify-center">
                            <p className="text-white font-bold text-lg">Saison</p>
                        </div>
                        <div className="h-[100%] w-[50%] bg-myorange flex items-center justify-center">
                            <p className="text-white font-bold text-lg">Durée</p>
                        </div>
                        <div className="h-[100%] w-[30%] bg-myblue rounded-tr-3xl flex items-center justify-center">
                            <p className="text-white font-bold text-lg">Actions</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {archive.length === 0 ? (
                            <div className="h-[10vh] w-[100%] flex justify-center items-center">
                                <p className="text-xl font-semibold">Vous ne disposez pas d'archives</p>
                            </div>
                        ) : (
                            archive.map(season => (
                                <div key={season.id} className="flex flex-row">
                                    <div className="h-[10vh] border w-[20%] border-r-myyellow border-l-myyellow border-b-myyellow flex justify-center items-center">
                                        <p className="text-xl font-semibold">{season.id}</p>
                                    </div>
                                    <div className="h-[10vh] w-[50%] border border-l-myorange border-r-myorange border-b-myorange flex flex-row justify-around items-center">
                                        <div className="w-[60%] flex justify-center">
                                            <p className="text-xl font-semibold">De : {season.date_debut}</p>
                                        </div>
                                        <div className="w-[35%] flex justify-center">
                                            <p className="text-xl font-semibold">A : {season.date_fin}</p>
                                        </div>
                                    </div>
                                    <div className="h-[10vh] w-[30%] border border-r-myblue border-b-myblue flex flex-row justify-around items-center">
                                        <button onClick={() => {}} className="bg-myyellow text-white px-10 py-2 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl">Télécharger</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default ArchivePage;