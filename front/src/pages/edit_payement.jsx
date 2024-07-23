import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavbarUser from '../components/navbar';
import { api } from '../utils/api';

const EditPayment = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch(); 
  const season = useSelector(state => state.season);
  const child = season.enfants.find(enf => enf.id == id);
  const [payments, setPayements] = useState({}); 
  const months = [
    { id: 1, name: 'Jan', number: '01' },
    { id: 2, name: 'Fev', number: '02' },
    { id: 3, name: 'Mar', number: '03' },
    { id: 4, name: 'Avr', number: '04' },
    { id: 5, name: 'Mai', number: '05' },
    { id: 6, name: 'Jun', number: '06' },
    { id: 7, name: 'Jul', number: '07' },
    { id: 8, name: 'Aou', number: '08' },
    { id: 9, name: 'Sep', number: '09' },
    { id: 10, name: 'Oct', number: '10' },
    { id: 11, name: 'Nov', number: '11' },
    { id: 12, name: 'Dec', number: '12' }
  ];
  useEffect(() => {
    //fetch child payment details
    const fetchChildPaymentDetails = async () => {
      try {
        const response = await api.get(`/api/saison/paiements/${id}`);
        const data = await response.data;
        setPayements(data);

      } catch (error) {
        console.error('Error fetching child payment details:', error);
      }
    };

    if (child) {
      fetchChildPaymentDetails();
    }
  }, [child]);

  const handleClick = async(month) => {
    try {
      await api.post(`/api/saison/paiements/${id}`,JSON.stringify({"mois": month.id}));
      setPayements({...payments, [month.id]: !payments[month.id]});

    } catch(error){
      console.log(error);
    }
  }

 

  return (
    <div className='h-[100vh] w-full flex flex-col'>
        <NavbarUser />
     <div className='flex flex-row justify-around'>
     <div className="pl-6 rounded-xl pt-3 h-[80vh] w-[45%] ">
        <h2 className="text-xl px-2 font-bold mb-2">Enfant</h2>
            <div className='mb-2 flex flex-row justify-between px-8 w-full'>
                <div className="w-[40%] ">
                    <label className="text-black font-bold">Nom :</label>
                    <input
                    readOnly={true}
                    type="text"
                    name="nom"
                    value={child.nom}
                    className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                    required
                />
                </div>
                <div className="w-[40%]">
                    <label className="text-black font-bold">Prénom :</label>
                    <input
                    readOnly={true}
                    type="text"
                    name="prenom"
                    value={child.prenom}
                    className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                    required
                    />
                </div>
            </div>
            <div className='mb-2 flex flex-row justify-between px-8 w-full'>
                <div className="w-[40%]">
                    <label className="text-black font-bold">Date de naissance :</label>
                    <input
                    type="date"
                    readOnly={true}
                    name="date_naissance"
                    value={child.date_naissance}
                    className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                    />
                </div>
                <div className="w-[40%]">
                    <label className="text-black font-bold">Groupe :</label>
                    <input
                    readOnly={true}
                    type="text"
                    name="groupe"
                    value={child.groupe}
                    className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                    required
                    />
                </div>
            </div>
            <div className="flex items-center mb-6 ml-6 flex-row justify-around w-[25%]">
              <label htmlFor="transport-checkbox" className="text-lg font-medium">
                Transport
              </label>
              <input
                type="checkbox"
                readOnly={true}
                id="transport-checkbox"
                checked={child.transport}
                className=" text-myyellow h-5 w-5"
              />
            </div>
          
          <h2 className="text-xl px-2 font-bold mb-2">Parent</h2>
          <div className='mb-2 flex flex-row justify-between px-8 w-full'>
            <div className="w-[40%]">
                <label className="text-black font-bold">Nom du tuteur :</label>
                <input
                type="text"
                name="nom_tuteur"
                value={child.nom_tuteur}
                readOnly={true}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                />
            </div>
            <div className="w-[40%]">
                <label className="text-black font-bold">Prénom du tuteur :</label>
                <input
                type="text"
                name="prenom_tuteur"
                value={child.prenom_tuteur}
                readOnly={true}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                />
            </div>
          </div>
          <div className='mb-2 flex flex-row justify-between px-8 w-full'>
            <div className="w-[40%]">
                <label className="text-black font-bold">Téléphone du tuteur :</label>
                <input
                type="tel"
                name="tel_tuteur"
                readOnly={true}
                value={child.tel_tuteur}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                />
            </div>
            <div className="w-[40%]">
                <label className="text-black font-bold">Email du tuteur :</label>
                <input
                type="email"
                name="email_tuteur"
                readOnly={true}
                value={child.email_tuteur}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                />
            </div>
          </div>
          <div className="mb-2  justify-between px-8 w-[65%]">
                <label className="text-black font-bold">Adresse : </label>
                <input
                type="text"
                name="adresse"
                readOnly
                value={child.adresse}
                className="p-2 border w-full border-yellow-500 bg-gray-100 rounded-xl mt-1"
                />
            </div>
      </div>
      <div className='w-[40%] h-full  flex flex-col items-center'>
      <h2 className="text-xl px-2 font-bold mb-2">Etat du paiement de l’enfant :</h2>
      <div className="grid grid-cols-3 gap-4 p-4">
      {months.map(month => (
        <div
          key={month.id}
          onClick={() => {
            handleClick(month);
          }}
          className={`p-5 border cursor-pointer rounded-lg flex flex-col items-center ${
            payments[month.id] ? 'bg-myblue px-8' : 'bg-myorange'
          }`}
        >
          <p className="text-lg font-semibold">{month.name}</p>
          <p className="text-md">{month.number}</p>
          <p className="text-sm">{payments[month.id] ? 'Payé' : 'Non payé'}</p>
        </div>
      ))}
    </div>
      </div>
     </div>
    </div>
  );
}

export default EditPayment;
