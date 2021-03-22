import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import ContactsList from './phonebook/ContactsList';
import ShowFav from './phonebook/ShowFav';
import AddContactForm from './phonebook/AddContactForm';
import EditContactForm from './phonebook/EditContactForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './styles.css';

import AuthFetchData from './phonebook/AuthFetchData';
import { AppContext } from '../context/appstore';

export default function App() {
  const { isSignedIn } = useContext(AppContext);
  return (
    <>
      <AuthFetchData />
      {isSignedIn && (
        <Container fluid className="backgr_wrapper">
          <Container className="content_wrapper">
            <Switch>
              <Route exact path="/" component={ContactsList} />
              <Route path="/addnewcontact" component={AddContactForm} />
              <Route path="/editcontact" component={EditContactForm} />
              <Route path="/showfavourites" component={ShowFav} />
            </Switch>
          </Container>
        </Container>
      )}
    </>
  );
}
