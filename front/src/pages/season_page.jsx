import React, { useState, useEffect } from "react";
import NavBarUser from "../components/navbar";
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import DeleteConfirmationInSeason from "../components/delete_confirmation_in_season";
import AddChildToSeason from "../components/add_child_to_season";
import EditChildInSeason from "../components/edit_child_in_season";
import { removeChild, addChild, updateChild } from "../actions/season_actions";
import { useNavigate } from "react-router-dom";

export default function SeasonPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const season = useSelector(state => state.season);
    const children = season.enfants;
    console.log(children); 

    const handleAddChild = (child) => {
        dispatch(addChild(child));
    };

    const handleRemoveChild = (id) => {
        dispatch(removeChild(id));
    };

    const handleUpdateChild = (upadatedChild) => {
        console.log(upadatedChild);
        dispatch(updateChild(upadatedChild));
    };

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);

    const handleDeleteClick = (child) => {
        setDeleteData(child);
        setIsDeleteOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setIsDeleteOpen(false);
    };
    const handleConfirmDelete = (id) => {
        handleRemoveChild(id);
        console.log('Item deleted');
        setIsDeleteOpen(false);
    };

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const handleAddClick = () => {
        setIsAddFormOpen(true);
    };
    const handleEditPayment = (id) => {
        navigate(`/edit_payment/${id}`); 
    }
    const handleCloseAddForm = () => {
        setIsAddFormOpen(false);
    };

    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [updateFormData, setUpdateFormData] = useState(null);

    const handleUpdateClick = (child) => {
        setUpdateFormData(child);
        setIsUpdateFormOpen(true);
    };
    const handleCloseUpdateForm = () => {
        setIsUpdateFormOpen(false);
    };

    const [filter, setFilter] = useState('');
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredChildren = children.filter(child =>
        (child.nom.toLowerCase()+" "+child.prenom.toLowerCase()).includes(filter.toLowerCase()) 
        || (child.prenom.toLowerCase()+" "+child.nom.toLowerCase()).includes(filter.toLowerCase()) 
    );

    return (
        <div>
            <NavBarUser />
            <div className="flex flex-col items-center">
                <div className="h-[10vh] w-[90%] flex flex-row justify-around items-center">
                    <h1 className="text-3xl text-myblue font-bold">Liste des enfants</h1>
                    <div className="w-[20%]"></div>
                    <div className="relative w-[35%]">
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
                <div className="w-[90%]">
                    <div className="h-[10vh] w-[100%] flex flex-row ---sticky top-0 ---z-10">
                        <div className="h-[100%] w-[20%] bg-myyellow rounded-tl-3xl flex items-center justify-center">
                            <p className="text-white font-bold text-lg">Enfants</p>
                        </div>
                        <div className="h-[100%] w-[40%] bg-myorange flex items-center justify-center">
                            <p className="text-white font-bold text-lg">Etat</p>
                        </div>
                        <div className="h-[100%] w-[40%] bg-myblue rounded-tr-3xl flex items-center justify-center">
                            <p className="text-white font-bold text-lg">Actions</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                    {filteredChildren.length === 0 ? (
                        <div className="h-[10vh] w-[100%] flex justify-center items-center">
                            <p className="text-xl font-semibold">Pas d'enfants, veuillez ajouter</p>
                        </div>
                    ) : (
                        filteredChildren.map(child => (
                            <div onClick={() => handleEditPayment(child.id)} key={child.id} className="flex cursor-pointer flex-row">
                                <div className="h-[10vh] border w-[20%] border-r-myyellow border-l-myyellow border-b-myyellow flex justify-center items-center">
                                    <p className="text-xl font-semibold">{child.nom} {child.prenom}</p>
                                </div>
                                <div className="h-[10vh] w-[40%] border border-l-myorange border-r-myorange border-b-myorange flex flex-row justify-around items-center">
                                    <div className="w-[40%] flex justify-center">
                                        <p className="text-xl font-semibold">Groupe {child.groupe}</p>
                                    </div>
                                    <div className="w-[40%] flex justify-center">
                                        <p className={`text-xl font-semibold ${child.transport ? "text-green-600" : "text-red-600"}`}>Transport</p>
                                    </div>
                                </div>
                                <div className="h-[10vh] w-[40%] border border-r-myblue border-b-myblue flex flex-row justify-around items-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent click propagation
                                            handleUpdateClick(child);
                                        }}
                                        className="bg-myyellow text-white px-10 py-2 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
                                    >
                                        Voir plus
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent click propagation
                                            handleDeleteClick(child);
                                        }}
                                        className="bg-myorange text-white px-8 py-2 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                                <DeleteConfirmationInSeason
                                    isOpen={isDeleteOpen}
                                    onClose={handleCloseDeleteModal}
                                    onConfirm={() => { handleConfirmDelete(child.id) }}
                                    name={child.nom}
                                />
                                <EditChildInSeason
                                    isOpen={isUpdateFormOpen}
                                    onClose={handleCloseUpdateForm}
                                    onUpdate={handleUpdateChild}
                                    child={child}
                                />
                            </div>
                        ))
                    )}

                    </div>
                    <div className="h-[10vh]"></div>
                </div>
                
                {isDeleteOpen && (
                    <DeleteConfirmationInSeason
                        isOpen={isDeleteOpen}
                        onClose={handleCloseDeleteModal}
                        onConfirm={() => { handleConfirmDelete(deleteData.id) }}
                        name={deleteData.nom}
                    />
                )}
                
                {isUpdateFormOpen && (
                    <EditChildInSeason
                        isOpen={isUpdateFormOpen}
                        onClose={handleCloseUpdateForm}
                        onUpdate={handleUpdateChild}
                        child={updateFormData}
                    />
                )}
                {isDeleteOpen || isUpdateFormOpen || (
                    <div>
                        <div className="fixed z-0 bottom-4 left-1/2 transform -translate-x-1/2">
                            <button onClick={handleAddClick} className="bg-myblue text-white px-8 py-2 rounded-3xl shadow-slate-300 border-2 border-white shadow-xl">Ajouter</button>
                        </div>
                        <AddChildToSeason
                            isOpen={isAddFormOpen}
                            onClose={handleCloseAddForm}
                            onAdd={handleAddChild}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
