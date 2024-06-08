import express from 'express';
import mongoose from 'mongoose';
import { Contact } from './Contactmodel.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect("mongodb+srv://pranav:mongocloud@cloudlearn.jrnkxc7.mongodb.net/", {
  dbName: "ContactDb",
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDb Connected!");
}).catch((err) => {
  console.log(err);
});

// Get all Contacts
app.get('/', async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.json({ message: "All Contacts", contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Contact
app.post('/', async (req, res) => {
  const { name, gmail, phone } = req.body;
  console.log(req.body);
  try {
    let contact = await Contact.findOne({ gmail });
    if (contact) return res.json({ message: "Contact already exists....!" });

    contact = await Contact.create({ name, gmail, phone });
    res.json({ message: "Contact saved successfully!", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit Contact
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not exist" });

    let updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Contact has been updated....!", contact: updatedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Contact
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact Not Exist !!!" });

    await contact.deleteOne();
    res.json({ message: "Your Contact has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 2000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
