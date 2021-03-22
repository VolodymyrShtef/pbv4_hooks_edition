import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../context/appstore';
import { useHistory } from 'react-router-dom';

export default function ShowFav() {
  const { innerContacts } = useContext(AppContext);
  let history = useHistory();

  function filterFavs() {
    const favContacts = innerContacts.filter(contact => contact.favourite);
    return favContacts;
  }
  const markup = filterFavs().map(contact => (
    <TableItem key={contact.id} item={contact} />
  ));

  function TableItem({ item }) {
    const { Name, Phone, Email } = item;
    return (
      <tr>
        <td>{Name}</td>
        <td>{Phone}</td>
        <td>{Email}</td>
      </tr>
    );
  }

  function handleButtonsClick(goTo) {
    history.push(goTo);
  }

  return (
    <>
      <h2>Favourite Contacts</h2>
      <Container className="flex_container_spased custom_wrapper">
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleButtonsClick('/addnewcontact')}
        >
          Add new contact
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleButtonsClick('/')}
        >
          Show all
        </Button>
      </Container>

      <Table responsive striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>{markup}</tbody>
      </Table>
    </>
  );
}
