import React, { createContext, useState, useContext } from 'react'
import Cookies from 'js-cookie'

export const SelectedUserContext = createContext();

export const SelectedUserProvider = ({children}) => {
    const [selectedUser, setSelectedUser] = useState();
  return (
    <SelectedUserContext.Provider value={[selectedUser, setSelectedUser]} >
        {children}
    </SelectedUserContext.Provider>
  )
}

export const useSelectedUser = () => useContext(SelectedUserContext);
