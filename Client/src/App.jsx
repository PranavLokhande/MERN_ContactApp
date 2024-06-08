import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactList from './Contact';
import ContactForm from './ContactForm';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const url = "http://localhost:2000";

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await axios.post(url, contact, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setContacts([...contacts, response.data.contact]);
    } catch (error) {
      console.error("Error adding contact", error);
    }
  };

  const editContact = async (id, updatedContact) => {
    try {
      const response = await axios.put(`${url}/${id}`, updatedContact, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setContacts(contacts.map(contact => contact._id === id ? response.data.contact : contact));
      setIsEditing(false);
      setCurrentContact(null);
    } catch (error) {
      console.error("Error editing contact", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  const handleEdit = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
  };

  return (
    <div className="App">
      <h1>Contact App</h1>
      <ContactForm
        addContact={addContact}
        editContact={editContact}
        isEditing={isEditing}
        currentContact={currentContact}
      />
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default App;
