import React from 'react';
import ContactCard from './ContactCard';
import './Contact.css';

const ContactList = ({ contacts, deleteContact, handleEdit }) => {
  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <ContactCard
          key={contact._id}
          contact={contact}
          deleteContact={deleteContact}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default ContactList;
