import React, { useState, useEffect } from 'react';
import edit  from '../assets/edit.png';
import { useSelector } from 'react-redux';

const EditChildInSeason = ({ isOpen, onClose, onUpdate, child }) => {
  const groupes = useSelector((state) => state.season.groupes);
  const [selectedGroup, setSelectedGroup] = useState(child.groupe);
  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };
  const [isTransport, setIsTransport] = useState(child.transport);

  const handleCheckboxTransport = (e) => {
    setIsTransport(e.target.checked);
  };


  const handleSubmit = () => {
    const updatedChild = { ...child, groupe: selectedGroup, transport: isTransport };
    onUpdate(updatedChild);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-15">
      <div className="bg-[#FFFBFB] p-6 rounded-xl shadow-lg h-[55vh] w-[40%] flex flex-col justify-around items-center">
        <div className='w-full h-[35%] flex flex-row justify-around items-center'>
          <div className=' w-[45%] h-[100%] flex flex-col justify-center'>
            <p className='text-2xl font-bold mb-4'>Enfant</p>
            <p className='text-lg px-4'>{child.nom} {child.prenom}</p>
          </div>
          <div className=' w-[35%] h-[80%]'>
            <img src={edit} alt="edit" />
          </div>
        </div>
        <div className='w-[90%] h-[35%] flex flex-col justify-around'>
          <p className='text-2xl font-bold mb-4'>Etat</p>
          <div className='flex flex-row justify-around'>
          <div className='flex flex-col w-[40%]'>
            <label>Groupe :</label>
            <select
            value={selectedGroup}
            onChange={handleGroupChange}
            className="mt-2 bg-mygray  border text-black border-myyellow rounded-lg py-1 px-4 focus:outline-none focus:border-myyellow"
          >
            <option value="" className='' disabled></option>
            {groupes.map((groupe) => (
              <option className='' key={groupe} value={groupe}>
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
                className=" text-myyellow h-5 w-5"
              />
          </div>
          </div>
        </div>
        <div className="flex w-full  justify-evenly">
            <button
              type="button"
              onClick={()=>{
                setSelectedGroup(child.groupe);
                setIsTransport(child.transport);
                onClose();
              }}
              className="bg-blue-500 text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-yellow-500 text-white px-6 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl"
            >
              Modifier
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditChildInSeason;
