import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../context/appstore';
import { useHistory } from 'react-router-dom';

export default function ContactsList() {
  const { innerContacts, deleteItem, setEditID, addToFavToggle } = useContext(
    AppContext,
  );
  let history = useHistory();
  const markup = innerContacts.map(contact => (
    <TableItem key={contact.id} item={contact} />
  ));

  function handleEditClick(editID) {
    setEditID(editID);
    history.push('/editcontact');
  }
  function handleButtonsClick(goTo) {
    history.push(goTo);
  }

  function TableItem({ item }) {
    const { Name, Phone, Email, favourite } = item;
    return (
      <tr>
        <td>{Name}</td>
        <td>{Phone}</td>
        <td>{Email}</td>
        <td>
          <Container className="flex_container_spased">
            <Button
              variant={favourite ? 'light' : 'secondary'}
              className="manage_fav_button button_with_marginR"
              size="sm"
              type="button"
              onClick={addToFavToggle}
              id={item.id}
            >
              {favourite ? 'Out of favourites' : 'Add to favourites'}
            </Button>

            <Button
              className="button_with_marginR button_with_marginL"
              variant="secondary"
              type="button"
              onClick={() => handleEditClick(item.id)}
              id={item.id}
            >
              Edit
            </Button>

            <Button
              className="button_with_marginL"
              variant="secondary"
              type="button"
              onClick={deleteItem}
              id={item.id}
            >
              Delete
            </Button>
          </Container>
        </td>
      </tr>
    );
  }

  return (
    <>
      <h2>Contacts List</h2>
      <Container className="flex_container_spased custom_wrapper">
        <Button
          className="button_with_marginR"
          variant="primary"
          size="lg"
          onClick={() => handleButtonsClick('/addnewcontact')}
        >
          Add new contact
        </Button>

        <Button
          className="button_with_marginL"
          variant="primary"
          size="lg"
          onClick={() => handleButtonsClick('/showfavourites')}
        >
          Show favourites
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
