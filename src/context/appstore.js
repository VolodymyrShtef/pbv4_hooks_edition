import React, { createContext, useState, useEffect, useCallback } from 'react';
import contacts from '../components/phonebook/firebase';
import { v4 as uuidv4 } from 'uuid';

import firebase from 'firebase/app';
import 'firebase/auth';

import { useHistory } from 'react-router-dom';

export const AppContext = createContext();

let firstRender = true;

export default function AppStore({ children }) {
  const [innerContacts, setContacts] = useState([]);
  const [isSignedIn, setSignIn] = useState(false);
  const [editID, setID] = useState('');
  const history = useHistory();

  // ****************************************
  useEffect(() => {
    if (firstRender) return;
    function storeInDB() {
      innerContacts.forEach(contact => {
        contacts
          .collection(firebase.auth().currentUser.displayName)
          .doc(contact.id)
          .set(
            {
              id: contact.id,
              Name: contact.Name,
              Phone: contact.Phone,
              Email: contact.Email,
              favourite: contact.favourite,
            },
            { merge: true },
          )
          .then(() => console.log('Stored in DB'))
          .catch(function (error) {
            console.error('Error adding ', error);
          });
      });
    }
    storeInDB();
  }, [innerContacts]);

  // ****************************************
  const setContext = useCallback((contactsList, isLogged) => {
    setContacts(contactsList);
    setSignIn(isLogged);
    firstRender = false;
  }, []);

  // ****************************************
  function addContact({ name, tel, email }) {
    if (innerContacts.find(contact => contact.Phone === tel)) {
      alert('Contact with entered phone number already exists');
      return;
    }
    const newContact = {
      id: uuidv4(),
      Name: name,
      Phone: tel,
      Email: email,
      favourite: false,
    };
    setContacts([...innerContacts, newContact]);
    history.push('/');
  }

  // ****************************************
  function addToFavToggle(e) {
    const idFavToggle = e.target.id;
    const updatedContacts = innerContacts.map(contact =>
      contact.id === idFavToggle
        ? { ...contact, favourite: !contact.favourite }
        : contact,
    );
    setContacts(updatedContacts);
  }

  // ********************************************************
  function editContact({ name, tel, email }) {
    if (
      innerContacts.find(
        contact => contact.id !== editID && contact.Phone === tel,
      )
    ) {
      alert('Contact with entered phone number already exists');
      return;
    }
    const updatedContacts = innerContacts.map(contact =>
      contact.id === editID
        ? { ...contact, Name: name, Phone: tel, Email: email }
        : { ...contact },
    );

    setContacts(updatedContacts);
    setEditID('');
    history.push('/');
  }

  // *******************************************************
  function deleteItem(e) {
    const idDelete = e.target.id;
    const updatedContacts = innerContacts.filter(
      contact => contact.id !== idDelete,
    );
    setContacts(updatedContacts);
    contacts
      .collection(firebase.auth().currentUser.displayName)
      .doc(idDelete)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  }

  // ************************************************
  function setEditID(eID) {
    setID(eID);
  }

  return (
    <AppContext.Provider
      value={{
        innerContacts,
        isSignedIn,
        editID,
        setContext,
        addContact,
        addToFavToggle,
        editContact,
        deleteItem,
        setEditID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
