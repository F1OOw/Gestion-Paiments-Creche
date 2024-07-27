import React, { useState, useEffect } from 'react';
import logo from '../assets/logo_v1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from '../actions/user_actions'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="h-[100vh] flex flex-row">
      {/* left side */}
      <div className='w-[55%] h-[100%]  relative overflow-hidden flex flex-row justify-center items-center'>
        {/* la texture */}
        <div className="absolute right-[-5%] top-[-5%] w-32 h-32 bg-myyellow rounded-full shadow-xl"></div>
        <div className="absolute left-[-5%] top-[92%] w-32 h-32 bg-myyellow rounded-full shadow-2xl"></div>
        <div className='h-[65%] w-[85%]  flex flex-col justify-between items-center'>
          <h1 className=' text-4xl text-myblue font-bold tracking-wide '>Bienvenue Chers Admin !</h1>
          <img src={logo} className='h-[80%]' alt="logo_v1" />
        </div>
      </div>
      {/* right side */}
      <div className={`w-[45%] h-[100%] bg-contain  bg-myblue relative overflow-hidden flex flex-row justify-center items-center`}>
        {/* la texture */}
        <div className="absolute right-[-8%] top-[-8%] w-32 h-32 bg-myorange rounded-full shadow-2xl"></div>
        <div className="absolute left-[-5%] top-[92%] w-32 h-32 bg-myorange rounded-full shadow-2xl"></div>
        <div className='h-[70%] w-[80%] flex flex-col items-center justify-between'>
          <h1 className=' text-4xl text-white font-bold tracking-wide '> Authentification</h1>
          <form onSubmit={handleLogin} className='h-[80%] w-[80%] flex flex-col justify-evenly ' >
            <div className='h-[22%] flex flex-col justify-between'>
              <h1 className='text-lg text-myyellow font-bold'>Nom d'utilisateur :</h1>
              <input
                type="text"
                id="username"
                className='w-full h-12 bg-white rounded-3xl border-2 border-myyellow shadow-md focus:outline-none focus:border-myyellow p-4'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='h-[22%] flex flex-col justify-between'>
              <h1 className='text-lg text-myyellow font-bold'> Mot de passe : </h1>
              <div className='relative w-full'>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full h-12 bg-white rounded-3xl border-2 border-myyellow shadow-md focus:outline-none focus:border-myyellow p-4 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                     onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
              </div>
            </div>
            <div className='w-[100%] h-[10%] flex flex-col justify-center items-center'>
              <button className='w-[60%] h-[100%] bg-myyellow rounded-3xl shadow-xl border-2 text-white font-bold tracking-wide' type="submit">Se connecter</button>
            </div>
          </form>
          {error && <div className="text-red-500  tracking-wider font-bold">{error}</div>}
        </div> 
      </div>
    </div>
  );
}

export default LoginPage;
