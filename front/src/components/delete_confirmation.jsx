import React, { useState } from 'react';
import cuate from '../assets/cuate.png'

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, name}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-35">
      <div className="bg-white p-6 h-[40vh] w-[40%] rounded-3xl shadow-lg flex flex-row justify-around items-center">
        <img src={cuate} alt="" className='w-[40%]' />
        <div className='w-[50%] h-[80%] flex flex-col justify-between items-center'>
            <p className="text-xl md:text-2xl font-bold  text-center">Attention !</p>
            <p className="text-center text-sm md:text-base font-bold">{"Voulez vous vraiment supprimer "+name+" ?"}</p>
            <div className="flex flex-row justify-between">
            <button onClick={onClose}
            className="bg-myyellow text-white px-5 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl">Annuler</button>
            <button 
            onClick={onConfirm}
            className="bg-myorange text-white px-4 py-1 rounded-xl shadow-slate-300 border-2 border-white text-sm shadow-xl">Supprimer</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;