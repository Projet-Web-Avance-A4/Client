"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { userContextType } from '../Interfaces/usercontexttype';
import { User } from '../Interfaces/user';

const UserContext = createContext<userContextType>({
  userData: {
    id_user: 0,
    name: '',
    surname: '',
    street: '',
    city: '',
    postal_code: '',
    phone: '',
    mail: '',
    role: ''
  },
  getUserData: () => { }
});

export { UserContext };

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUser] = useState<User | null>({
    id_user: 0,
    name: '',
    surname: '',
    street: '',
    city: '',
    postal_code: '',
    phone: '',
    mail: '',
    role: ''
  });

  const getUserData = (user: User | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ userData, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};