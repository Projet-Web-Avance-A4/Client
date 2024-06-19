"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { userContextType } from '../interfaces/usercontexttype';
import { User } from '../interfaces/user';

const UserContext = createContext<userContextType>({
  userData: {
    id: 0,
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
  const [userData, setUser] = useState<User | undefined>({
    id: 0,
    name: '',
    surname: '',
    street: '',
    city: '',
    postal_code: '',
    phone: '',
    mail: '',
    role: ''
  });

  const getUserData = (user: User | undefined) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ userData, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};