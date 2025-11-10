const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// #swagger.tags = ['Contacts']

router.get('/', async (req, res) => {
  /*
    #swagger.summary = 'Get all contacts'
    #swagger.responses[200] = {
      description: 'List of all contacts',
      schema: [{ $ref: '#/definitions/Contact' }]
    }
  */
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err });
  }
});

router.get('/:id', async (req, res) => {
  /*
    #swagger.summary = 'Get a contact by ID'
    #swagger.parameters['id'] = { description: 'Contact ID' }
    #swagger.responses[200] = { description: 'Contact found' }
    #swagger.responses[404] = { description: 'Contact not found' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error searching for contact', error: err });
  }
});

router.post('/', async (req, res) => {
  /*
    #swagger.summary = 'Create a new contact'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact data',
      required: true,
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[201] = { description: 'Contact created successfully' }
  */
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const saved = await newContact.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact', error: err });
  }
});

router.put('/:id', async (req, res) => {
  /*
    #swagger.summary = 'Update a contact by ID'
    #swagger.parameters['id'] = { description: 'Contact ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact data',
      required: true,
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[204] = { description: 'Contact updated successfully' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updated = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  /*
    #swagger.summary = 'Delete a contact by ID'
    #swagger.parameters['id'] = { description: 'Contact ID' }
    #swagger.responses[204] = { description: 'Contact deleted successfully' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  try {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err });
  }
});

module.exports = router;
