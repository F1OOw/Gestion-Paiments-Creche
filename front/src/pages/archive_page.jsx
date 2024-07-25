import React, { useEffect , useState } from "react";
import NavBarUser from "../components/navbar";
import { api, deleteToken } from "../utils/api";
import { saveAs } from 'file-saver';

const ArchivePage = () => {
    const [archive, setArchive] = useState([]);

    useEffect(() => {
        // fetch archive data
        const fetchArchive = async () =>{
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                const response = await api.get("/api/archives");
                setArchive(response.data);
                
            } catch (error) {
                console.error(error);
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

        fetchArchive();
    }, []);

    const downloadArchive = async (id)=>{
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await api.get(`/api/archives/${id}`, {
                responseType: 'blob' // Important for handling binary data
            });
            saveAs(response.data,`archive_${id}.csv`)

        } catch (error) {
            console.error(error);
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

    return (
         <div>
            <NavBarUser/>
            <div className="flex flex-col items-center">
                <div className="h-[10vh] w-[90%] flex flex-row justify-around items-center">
                    <h1 className="text-3xl text-myblue font-bold">Liste des archives :</h1>
                    <div className="w-[20%]"></div>
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
                                        <button onClick={() => {downloadArchive(season.id)}} className="bg-myyellow text-white px-10 py-2 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl">Télécharger</button>
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