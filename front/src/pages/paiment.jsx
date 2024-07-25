import React, { useEffect, useState } from 'react'; 
import NavBarUser from '../components/navbar';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const months = [
    { id: 1, name: 'Jan', number: '01' },
    { id: 2, name: 'Feb', number: '02' },
    { id: 3, name: 'Mar', number: '03' },
    { id: 4, name: 'Apr', number: '04' },
    { id: 5, name: 'May', number: '05' },
    { id: 6, name: 'Jun', number: '06' },
    { id: 7, name: 'Jul', number: '07' },
    { id: 8, name: 'Aug', number: '08' },
    { id: 9, name: 'Sep', number: '09' },
    { id: 10, name: 'Oct', number: '10' },
    { id: 11, name: 'Nov', number: '11' },
    { id: 12, name: 'Dec', number: '12' }
];

export default function Payment() {
    // const children = useSelector(state => state.season.enfants);
    const [children, setChildren] = useState([]); 
    const [filter, setFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const handleMonthClick = (monthId) => setSelectedMonth(monthId);
    const enfs = useSelector(state => state.season.enfants);
    useEffect(() => {
        if (selectedMonth !== null) {
            setChildren(enfs);
            console.log('Fetching children data for month:', selectedMonth);
            // axios.get(`/api/saison/paiements?month=${selectedMonth}`)
            //     .then(response => {
            //         setChildren(response.data);
            //     })
            //     .catch(error => {
            //         console.error('Error fetching children data:', error);
            //     });
        } // change just thus
    }, [selectedMonth]);

    const filteredChildren = children.filter(child =>
        (child.nom.toLowerCase() + " " + child.prenom.toLowerCase()).includes(filter.toLowerCase()) ||
        (child.prenom.toLowerCase() + " " + child.nom.toLowerCase()).includes(filter.toLowerCase())
    );

    return (
        <div className='flex flex-col items-center'>
            <NavBarUser />
            <div className="h-[10vh] mb-4 w-[90%] flex flex-row justify-around items-center">
                <h1 className="text-2xl text-myblue">Enfants qui n’ont pas payés dans ce mois :</h1>
                <div className="w-[20%]"></div>
                <div className="relative w-[35%] z-0">
                    <input
                        type="text"
                        placeholder="Introduisez un nom d'enfant ..."
                        className="w-full border-2 border-myyellow rounded-3xl py-2 px-4 focus:outline-none focus:border-myyellow"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                    <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-myorange" />
                </div>
            </div>
            <div className='flex flex-row justify-around  w-[100%]'>
                <div className='flex flex-col items-center w-[50%]'>
                    <div className="w-full">
                        <div className="h-[10vh] w-[100%] flex flex-row ---sticky top-0 ---z-10">
                            <div className="h-[100%] w-[40%] bg-myyellow rounded-tl-3xl flex items-center justify-center">
                                <p className="text-white font-bold text-lg">Enfants</p>
                            </div>
                            <div className="h-[100%] w-[60%] bg-myorange rounded-tr-3xl flex items-center justify-center">
                                <p className="text-white font-bold text-lg">Etat</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {filteredChildren.length === 0 ? (
                                <div className="h-[10vh] w-[100%] flex justify-center items-center">
                                    <p className="text-xl font-semibold">Pas d'enfants, veuillez ajouter</p>
                                </div>
                            ) : (
                                filteredChildren.map(child => (
                                    <div key={child.id} className="flex flex-row">
                                        <div className="h-[10vh] border w-[40%] border-r-myyellow border-l-myyellow border-b-myyellow flex justify-center items-center">
                                            <p className="text-xl font-semibold">{child.nom} {child.prenom}</p>
                                        </div>
                                        <div className="h-[10vh] w-[60%] border border-l-myorange border-r-myorange border-b-myorange flex flex-row justify-around items-center">
                                            <div className="w-[60%] flex justify-center">
                                                <p className="text-xl font-semibold">Groupe 0{child.groupe}</p>
                                            </div>
                                            <div className="w-[35%] flex justify-center">
                                                <p className={`text-xl font-semibold ${child.transport ? "text-green-600" : "text-red-600"}`}>Transport</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="h-[10vh]"></div>
                    </div>
                </div>
                <div className='w-[35%]  h-full flex flex-col items-center'>
                    <h2 className="text-3xl px-2  mb-2 text-myblue">Veuiller choisir un mois :</h2>
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {months.map(month => (
                            <div
                                key={month.id}
                                onClick={() => handleMonthClick(month.id)}
                                className={`px-7 py-5 shadow-2xl border cursor-pointer rounded-xl flex flex-col items-center ${selectedMonth === month.id ? 'bg-myblue' : 'bg-[#f6f6f6]'}`}
                            >
                                <p className="text-lg font-semibold">{month.name}</p>
                                <p className="text-md">{month.number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
