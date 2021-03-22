import React, { useState, useContext } from 'react';
import ContactInputForm from './ContactInputForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../context/appstore';
import { useHistory } from 'react-router-dom';

export default function AddContactForm() {
  const [state, setState] = useState({});
  const { addContact } = useContext(AppContext);
  let history = useHistory();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.name && state.tel) addContact(state);
    else alert('Fields with * required');
  }

  function handleBack() {
    history.push('/');
  }

  return (
    <>
      <Container className="flex_container">
        <h2 className="new_contact_title">New Contact</h2>
        <Button
          className="back_button"
          variant="outline-primary"
          type="button"
          onClick={handleBack}
        >
          Back
        </Button>
      </Container>

      <ContactInputForm
        state={state}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  );
}
