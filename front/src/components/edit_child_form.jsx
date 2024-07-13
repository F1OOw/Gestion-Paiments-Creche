import React, { useState, useEffect } from 'react';

const EditChildForm = ({ isOpen, onClose, onUpdate, child }) => {
  const [formData, setFormData] = useState({
    id: child.id,
    nom: '',
    prenom: '',
    date_naissance: '',
    nom_tuteur: '',
    prenom_tuteur: '',
    tel_tuteur: '',
    email_tuteur: '',
    adresse_tuteur: ''
  });

  useEffect(() => {
    if (child) {
      setFormData({
        id: child.id,
        nom: child.nom,
        prenom: child.prenom,
        date_naissance: child.date_naissance,
        nom_tuteur: child.nom_tuteur,
        prenom_tuteur: child.prenom_tuteur,
        tel_tuteur: child.tel_tuteur,
        email_tuteur: child.email_tuteur,
        adresse_tuteur: child.adresse_tuteur
      });
    }
  }, [child]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-35">
      <div className="bg-[#FFFBFB] p-6 rounded-xl shadow-lg h-[80vh] w-[40%] ">
        <h2 className="text-xl px-2 font-bold mb-2">Modifier Enfant</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-2 flex flex-row justify-between px-8 w-full'>
                <div className="w-[40%] ">
                    <label className="text-black font-bold">Nom :</label>
                    <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
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
                    className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                    required
                    />
                </div>
            </div>
          <div className="mb-2 px-8 w-[45%]">
            <label className="text-black font-bold">Date de naissance :</label>
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
              required
            />
          </div>
          <h2 className="text-xl px-2 font-bold mb-2">Parent</h2>
          <div className='mb-2 flex flex-row justify-between px-8 w-full'>
            <div className="w-[40%]">
                <label className="text-black font-bold">Nom du tuteur :</label>
                <input
                type="text"
                name="nom_tuteur"
                value={formData.nom_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
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
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                required
                />
            </div>
          </div>
          <div className='mb-2 flex flex-row justify-between px-8 w-full'>
            <div className="w-[40%]">
                <label className="text-black font-bold">Téléphone du tuteur :</label>
                <input
                type="tel"
                name="tel_tuteur"
                value={formData.tel_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
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
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                required
                />
            </div>
          </div>
          <div className="mb-2  justify-between px-8 w-[65%]">
                <label className="text-black font-bold">Adresse : </label>
                <input
                type="text"
                name="adresse_tuteur"
                value={formData.adresse_tuteur}
                onChange={handleChange}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                required
                />
            </div>
          <div className="flex  justify-evenly">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChildForm;
