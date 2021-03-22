import React, { useState, useContext, useEffect } from 'react';
import ContactInputForm from './ContactInputForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../context/appstore';
import { useHistory } from 'react-router-dom';

export default function EditContactForm() {
  const [state, setState] = useState({});
  const { editContact, editID, innerContacts } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!editID) {
      history.push('/');
    } else {
      const editingContact = innerContacts.find(
        contact => contact.id === editID,
      );
      setState({
        name: editingContact.Name,
        tel: editingContact.Phone,
        email: editingContact.Email,
      });
    }
  }, [editID, innerContacts, history]);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.name && state.tel) editContact(state);
    else alert('Fields with * required');
  }

  function handleBack() {
    history.push('/');
  }

  return (
    <>
      <Container className="flex_container">
        <h2 className="new_contact_title">Edit Contact</h2>
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
