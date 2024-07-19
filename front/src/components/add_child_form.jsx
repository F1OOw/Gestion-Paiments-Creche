import React, { useState } from 'react';

const AddChildForm = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    nom_tuteur: '',
    prenom_tuteur: '',
    tel_tuteur: '',
    email_tuteur: '',
    adresse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dt = new Date(formData.date_naissance)
    timestamp = dt.getTime()

    setFormData((prevData)=>({
      ...prevData,
      [date]: timestamp,
    }))
    // console.log(formData);
    onAdd(formData);
    // setFormData({}); // Clear form
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-35">
      <div className="bg-[#FFFBFB] p-6 rounded-xl shadow-lg h-[80vh] w-[40%] flex flex-col justify-between ">
        <h2 className="text-xl px-2 font-bold ">Enfant</h2>
        <form onSubmit={handleSubmit} className='flex flex-col justify-evenly h-[95%]'>
            <div className=' flex flex-row justify-between px-8 w-full'>
                <div className="w-[40%] ">
                    <label className="text-black font-bold">Nom :</label>
                    <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                    required
                />
                </div>
                <div className="w-[40%]">
                    <label className="text-black font-bold">Prénom :</label>
                    <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                    required
                    />
                </div>
            </div>
          <div className=" px-8 w-[45%]">
            <label className="text-black font-bold">Date de naissance :</label>
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
              required
            />
          </div>
          <h2 className="text-xl px-2 font-bold ">Parent</h2>
          <div className=' flex flex-row justify-between px-8 w-full'>
            <div className="w-[40%]">
                <label className="text-black font-bold">Nom du tuteur :</label>
                <input
                type="text"
                name="nom_tuteur"
                value={formData.nom_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                required
                />
            </div>
            <div className="w-[40%]">
                <label className="text-black font-bold">Prénom du tuteur :</label>
                <input
                type="text"
                name="prenom_tuteur"
                value={formData.prenom_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                required
                />
            </div>
          </div>
          <div className=' flex flex-row justify-between px-8 w-full'>
            <div className="w-[40%]">
                <label className="text-black font-bold">Téléphone du tuteur :</label>
                <input
                type="tel"
                name="tel_tuteur"
                value={formData.tel_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                required
                />
            </div>
            <div className="w-[40%]">
                <label className="text-black font-bold">Email du tuteur :</label>
                <input
                type="email"
                name="email_tuteur"
                value={formData.email_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                required
                />
            </div>
          </div>
          <div className="  justify-between px-8 w-[65%]">
                <label className="text-black font-bold">Adresse : </label>
                <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="p-2 border w-full border-myyellow bg-mygray rounded-xl mt-1"
                required
                />
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default AddChildForm;
