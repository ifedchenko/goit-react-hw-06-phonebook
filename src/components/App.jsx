import React, { useState, useEffect, useRef } from 'react';
import { Container } from './Container/Container';
import { Section } from './Section/Section';
import Form from './Form/Form';
import Contact from './Contact/Contact';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (id, name, number) => {
    const isContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!isContactExist) {
      setContacts(prevContacts => [{ id, name, number }, ...prevContacts]);
    } else {
      alert(`This ${name} already exists!`);
    }
  };

  const deleteContact = id => {
    const filterContacts = contacts.filter(contact => contact.id !== id);
    setContacts(filterContacts);
  };

  const onFilterChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const onActiveFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  return (
    <>
      <Container>
        <Section title={'Phonebook'}>
          <Form onSubmit={addContact}></Form>
        </Section>
        <Section title={'Contacts'}>
          <Filter text={filter} onChange={onFilterChange} />
          {filter === '' ? (
            <Contact contacts={contacts} deleteContact={deleteContact} />
          ) : (
            <Contact
              contacts={onActiveFilter()}
              deleteContact={deleteContact}
            />
          )}
        </Section>
      </Container>
    </>
  );
};

export default App;
