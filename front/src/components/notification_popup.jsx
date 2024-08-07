import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearNotification } from '../slices/notification_slice';

const Notification = ({message, isError}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleClose = () => {
    setVisible(false);
    dispatch(clearNotification());
  };

  if (!visible || !message) return null;

  return (
    <div className="flex w-full bg-black justify-center items-center">
      {isError  && (
        <div className="rounded-[15px] fixed z-50 w-[30%] top-4 bg-[#eb1717] text-lg text-white text-center p-3 shadow-lg flex justify-between items-center">
          <span>{message}</span>
          <button onClick={handleClose} className="ml-4 bg-white text-red-500 rounded-full px-3 py-1 shadow-md">
            X
          </button>
        </div>
      )}

      {!isError  && (
        <div className="rounded-[15px] fixed z-50 w-[30%] top-4 bg-[#082fbf] text-lg text-white text-center p-3 shadow-lg flex justify-between items-center">
        <span>{message}</span>
        <button onClick={handleClose} className="ml-4 bg-white text-red-500 rounded-full px-3 py-1 shadow-md">
          X
        </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
