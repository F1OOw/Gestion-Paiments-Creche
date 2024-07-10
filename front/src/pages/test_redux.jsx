// ChildrenComponent.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChild, removeChild, updateChild } from '../slices/children_slice';

const ChildrenComponent = () => {
  const children = useSelector(state => state.children);
  const dispatch = useDispatch();

  const handleAddChild = () => {
    dispatch(addChild({
      id: 2,
      nom: 'Nom',
      prenom: 'Prenom',
      date_naissance: '01/01/2024',
      nom_tuteur: 'Nom Tuteur',
      prenom_tuteur: 'Prenom Tuteur',
      tel_tuteur: '0677777777',
      email_tuteur: 'something@something.com'
    }));
  };

  const handleRemoveChild = (id) => {
    dispatch(removeChild({ id }));
  };

  const handleUpdateChild = (id) => {
    dispatch(updateChild({
      id,
      nom: 'Nom Updated',
      prenom: 'Prenom Updated',
      date_naissance: '01/01/2024',
      nom_tuteur: 'Nom Tuteur Updated',
      prenom_tuteur: 'Prenom Tuteur Updated',
      tel_tuteur: '0677777777',
      email_tuteur: 'something@something.com'
    }));
  };

  return (
    <div>
      <h2>Children Information</h2>
      <button onClick={handleAddChild}>Add Child</button>
      {children.map(child => (
        <div key={child.id}>
          <p>{child.nom} {child.prenom}</p>
          <button onClick={() => handleRemoveChild(child.id)}>Remove</button>
          <button onClick={() => handleUpdateChild(child.id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default ChildrenComponent;
