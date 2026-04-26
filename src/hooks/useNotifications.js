import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Complete your assessment to unlock job matches.', type: 'info', time: 'Just now' },
    { id: 2, title: 'New Job Match', message: 'A new Junior Developer role matches your profile.', type: 'success', time: '1h ago' }
  ]);

  const addNotification = (notif) => {
    setNotifications(prev => [{ id: Date.now(), ...notif, time: 'Just now' }, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

export default useNotifications;
