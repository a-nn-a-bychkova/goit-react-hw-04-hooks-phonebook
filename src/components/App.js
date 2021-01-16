import React, { useState, useEffect, Component } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import initialContacts from '../initialContacts.json';

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    console.log('component useEffect');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(contacts => [...parsedContacts]);
    }
  }, []);
  useEffect(() => {
    console.log('обновились контакты');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isNameInContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isNameInContact) {
      alert(`${name} is already in contact`);
    } else if (name !== '' || number !== '') {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };
      setContacts(contacts => [newContact, ...contacts]);
    }
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} onChange={changeFilter} />
      ) : (
        <p>Your phonebook is empty</p>
      )}

      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
