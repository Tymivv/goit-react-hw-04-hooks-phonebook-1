import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import * as storage from "../Servises/localStorage";

import { nanoid } from "nanoid";

const STORAGE_KEY = "contacts";

const App = () => {
  const [contacts, setContacts] = useState(storage.get(STORAGE_KEY) ?? []);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    storage.save(STORAGE_KEY, contacts);
  }, [contacts]);

  ////////додає контакт

  const addContacts = ({ name, number }) => {
    if (
      contacts.some(
        ({ id, nameContact, tel }) =>
          nameContact.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`name "${name}" is already in list`);
      return;
    }
    const newContact = {
      id: nanoid(),
      nameContact: name,
      tel: number,
    };
    console.log(newContact);
    setContacts((prevContacts) => [...prevContacts, newContact]);
    console.log(contacts);
  };
  // шукає контакт

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ nameContact }) =>
      nameContact.toLowerCase().includes(normalizedFilter)
    );
  };

  ////видаляє контакт

  // deleteContacts = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== id),
  //   }));
  // };

  const deleteContacts = (id) => () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };
  ///////////////
  return (
    <div>
      <h1>Phonebooc</h1>
      <ContactForm onSubmit={addContacts} />

      <Filter
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />

      <ContactList
        onDelete={deleteContacts}
        filteredContacts={getFilteredContacts()}
      />
    </div>
  );
};

export default App;
