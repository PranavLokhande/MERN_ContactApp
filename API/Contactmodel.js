import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gmail: { type: String, required: true },
  phone: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

export { Contact };
