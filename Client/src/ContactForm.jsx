import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ addContact, editContact, isEditing, currentContact }) => {
  const [contact, setContact] = useState({ name: '', gmail: '', phone: '' });

  useEffect(() => {
    if (isEditing) {
      setContact(currentContact);
    } else {
      setContact({ name: '', gmail: '', phone: '' });
    }
  }, [isEditing, currentContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editContact(currentContact._id, contact);
    } else {
      addContact(contact);
    }
    setContact({ name: '', gmail: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="gmail"
        value={contact.gmail}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ContactForm;
