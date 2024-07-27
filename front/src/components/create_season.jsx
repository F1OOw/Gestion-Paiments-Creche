import React, { useState } from 'react';

const CreateSeason = ({ isOpen, onClose, onAdd }) => {
  const [seasonData, setSeasonData] = useState({
    date_debut: '',
    date_fin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeasonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(seasonData);
    setSeasonData({ date_debut: '', date_fin: '' }); // Clear form
    onClose();
  };
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-800 bg-opacity-35">
      <div className="bg-[#FFFBFB] p-2 rounded-3xl shadow-lg h-[40vh] w-[40%] flex  z-50 flex-col justify-evenly items-center">
        <div className='h-[30%] text-center'>
            <h2 className="text-2xl tracking-wide px-2 pb-2 font-bold">Aucune saison actuelle !</h2>
            <p className="text px-2 ">Ajout d'une nouvelle saison</p>
            <p className="text px-2 ">Veuillez choisissez</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col justify-evenly h-[50%]'>
        <div className='flex flex-row justify-around'>
        <div className="px-8 w-[45%]">
            <label className="text-black font-bold">Date Début :</label>
            <input
              type="date"
              name="date_debut"
              value={seasonData.date_debut}
              onChange={handleChange}
              className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
              required
            />
          </div>
          <div className="px-8 w-[45%]">
            <label className="text-black font-bold">Date Fin :</label>
            <input
              type="date"
              name="date_fin"
              value={seasonData.date_fin}
              onChange={handleChange}
              className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
              required
            />
          </div>
        </div>
          <div className="flex justify-evenly mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-myorange text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-myblue text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSeason;
