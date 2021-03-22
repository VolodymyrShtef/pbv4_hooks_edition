import React, { useEffect, useContext } from 'react';
import contacts from './firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/firestore';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Logo from '../../images/phone-book.svg';
import { AppContext } from '../../context/appstore';

export default function AuthFetchData() {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  const { setContext } = useContext(AppContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetchContacts(firebase.auth().currentUser.displayName);
      } else setContext([], false);
    });

    async function fetchContacts(user) {
      let allContacts = [];
      await contacts
        .collection(user)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            allContacts.push(doc.data());
          });
        });
      setContext(allContacts, true);
    }
  }, [setContext]);

  return !firebase.auth().currentUser ? (
    <>
      <h2>Sign in, please</h2>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  ) : (
    <Container className="custom_wrapper">
      <Container className="flex_container">
        <img className="img_main" src={Logo} alt="" width="50" />
        <h2>
          Welcome to Phonebook App, {firebase.auth().currentUser.displayName}
        </h2>
      </Container>
      <Button variant="dark" onClick={() => firebase.auth().signOut()}>
        Sign out!
      </Button>
    </Container>
  );
}
