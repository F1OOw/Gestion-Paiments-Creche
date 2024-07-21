import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const AddChildToSeason = ({ isOpen, onClose, onAdd }) => {
  const children = useSelector((state) => state.children);
  console.log(children);

  const [selectedChildren, setSelectedChildren] = useState({});

  const handleCheckboxChange = (e, childId) => {
    setSelectedChildren((prevSelected) => ({
      ...prevSelected,
      [childId]: e.target.checked,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedChildData = Object.keys(selectedChildren)
      .filter((childId) => selectedChildren[childId])
      .map((childId) => children.find((child) => child.id === childId));

    onAdd(selectedChildData);
    setSelectedChildren({}); // Clear selected children
    setFormData({}); // Clear form
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-35">
      <div className="bg-[#FFFBFB] p-6 rounded-xl shadow-lg h-[80vh] w-[40%] flex flex-col justify-between items-center">
        <div className="w-[100%] flex flex-row justify-around items-center">
          <h2 className="text-xl px-2 font-bold">Enfant</h2>
          <div className="relative w-[70%]">
            <input
              type="text"
              placeholder="Introduisez un nom d'enfant ..."
              className="w-full border border-myyellow rounded-3xl py-2 px-4 focus:outline-none focus:border-myyellow"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-myorange" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center h-[50%] w-[90%] border-myyellow border border-b-0 rounded-3xl overflow-y-auto">
          <div className="h-[10vh] w-[100%] flex flex-row sticky top-0 z-10">
            <div className="w-[100%] bg-myyellow  flex items-center justify-center">
              <p className="text-white font-bold text-lg">Séléctionnez un enfant</p>
            </div>
          </div>
          <div className="w-[100%] flex flex-col h-[80%] overflow-y-auto">
            {children.map((child) => (
              <label key={child.id} className="flex items-center border-b border-myyellow w-[100%] h-[50%]  space-x-2">
                <input
                  type="checkbox"
                  checked={!!selectedChildren[child.id]}
                  onChange={(e) => handleCheckboxChange(e, child.id)}
                />
                <div c>{child.nom} {child.prenom}</div>
              </label>
            ))}
          </div>
        </form>
          <div className="flex  justify-evenly">
            <button
              type="button"
              onClick={onClose}
              className="bg-myblue text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-myyellow text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Ajouter
            </button>
            </div>
      </div>
    </div>
  );
};

export default AddChildToSeason;
