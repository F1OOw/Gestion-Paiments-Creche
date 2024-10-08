import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const AddChildToSeason = ({ isOpen, onClose, onAdd }) => {
  const children = useSelector((state) => state.children.children);
  const season = useSelector((state) => state.season)
  const groupes = useSelector((state) => state.season.groupes);
  const [selectedChild, setSelectedChild] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isTransport, setIsTransport] = useState(false);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');


  const handleCheckboxChange = (e, child) => {
    if (e.target.checked) {
      setSelectedChild(child);
    } else {
      setSelectedChild({});
    }
  };

  const handleSubmit = (e) => {
    if(!selectedChild) {
      setError("Veuillez sélectionner un enfant");
      return;
    }else{
      if(!selectedGroup){
        setError("Veuillez sélectionner un groupe");
        return;
      }
    }
    setError("");
    const child  = { ...selectedChild , 
      groupe: selectedGroup,
      transport: isTransport
    };
    onAdd(child); 
    setSelectedChild(null);
    setSelectedGroup('');
    onClose();
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleCheckboxTransport = (e) => {
    setIsTransport(e.target.checked);
  };

  const checkAdded = (child) =>{
    for (var i=0; i<season.enfants.length; i++){
      if (season.enfants[i].id == child.id ){
        return true;
      }
    }
    return false ;
  }

  const filteredChildren = children.filter(child => 
    (!checkAdded(child)) &&
    (
      (child.nom.toLowerCase()+" "+child.prenom.toLowerCase()).includes(filter.toLowerCase()) 
      || (child.prenom.toLowerCase()+" "+child.nom.toLowerCase()).includes(filter.toLowerCase()) 
    )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center z-20 justify-center bg-gray-800 bg-opacity-35">
      <div className="bg-[#FFFBFB] p-6 rounded-xl shadow-lg h-[85vh] w-[45%] flex flex-col justify-between items-center">
        <div className="w-[100%] flex flex-row justify-around items-center">
          <h2 className="text-xl px-2 font-bold">Enfant</h2>
          <div className="relative w-[70%]">
            <input
              type="text"
              placeholder="Introduisez un nom d'enfant ..."
              className="w-full border border-myyellow rounded-3xl py-2 px-4 focus:outline-none focus:border-myyellow"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-myorange" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center h-[50%] w-[90%] border-myyellow border rounded-3xl overflow-y-auto">
          <div className="h-[8vh] w-[100%] flex flex-row sticky top-0 z-10">
            <div className="w-[100%] bg-myyellow flex items-center justify-center">
              <p className="text-white font-bold text-lg">Sélectionnez un enfant</p>
            </div>
          </div>
          <div className="w-[100%] flex flex-col h-[75%] overflow-y-auto">
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child) => (
                <label
                  key={child.id}
                  className="flex cursor-pointer p-5 border-b border-myyellow w-[100%] h-[50%] flex-row justify-around items-center"
                >
                  <p className='font-semibold w-[45%]'>{child.nom} {child.prenom}</p>
                  <input
                    type="radio"
                    className='h-5 w-5 bg-black border-red-300 rounded'
                    checked={selectedChild && selectedChild.id === child.id}
                    onChange={(e) => handleCheckboxChange(e, child)}
                  />
                </label>
              ))
            ) : (
              <div className="text-center mt-5">Aucun enfant trouvé</div>
            )}
          </div>
        </form>
        <div className='h-[18%] w-full flex flex-col justify-between'>
          <p className='text-xl px-2 font-bold'>Situation</p>
          <div className='flex flex-row justify-around'>
            <div className='flex flex-col w-[40%]'>
              <label>Groupe :</label>
              <select
                value={selectedGroup}
                onChange={handleGroupChange}
                className="mt-2 bg-mygray cursor-pointer border text-black border-myyellow rounded-lg py-1 px-4 focus:outline-none focus:border-myyellow"
              >
                <option value="" disabled></option>
                {groupes.map((groupe) => (
                  <option key={groupe}  value={groupe}>
                    Groupe {groupe}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-6 flex-row justify-around w-[25%]">
              <label htmlFor="transport-checkbox" className="text-lg font-medium">
                Transport
              </label>
              <input
                type="checkbox"
                id="transport-checkbox"
                checked={isTransport}
                onChange={handleCheckboxTransport}
                className="text-myyellow h-5 w-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex w-[100%] justify-evenly">
          <button
            type="button"
            onClick={() => {
              setError("");
              setIsTransport(false);
              setSelectedChild(null);
              setSelectedGroup('');
              onClose();
            }}
            className="bg-myblue text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-myyellow text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
          >
            Ajouter
          </button>
        </div>
        <div>
          <p className='text-red-600'>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default AddChildToSeason;
