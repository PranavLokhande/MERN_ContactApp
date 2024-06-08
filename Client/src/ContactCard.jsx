import React from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, deleteContact, handleEdit }) => {
  return (
    <div className="contact-card">
      <h2>{contact.name}</h2>
      <p>Email: {contact.gmail}</p>
      <p>Phone: {contact.phone}</p>
      <div className="buttons">
        <button onClick={() => handleEdit(contact)}>Edit</button>
        <button onClick={() => deleteContact(contact._id)}>Delete</button>
      </div>
    </div>
  );
};

export default ContactCard;
