const express = require('express');
const router = express.Router();
const db = require('../models');
const { Contact } = db;

router.get('/', (req, res) => {
    Contact.findAll({})
        .then(contacts => res.json(contacts));
});


router.post('/', (req, res) => {
    let { name, email, message } = req.body;
    Contact.create({ name, email, message })
        .then(contact => {
            res.status(201).json(contact);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Contact.findByPk(id)
        .then(contact => {
            if (!contact) {
                return res.sendStatus(404);
            }

            res.json(contact);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Contact.findByPk(id)
        .then(contact => {
            if (!contact) {
                return res.sendStatus(404);
            }

            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.message = req.body.message;
            contact.save()
                .then(contact => {
                    res.json(contact);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Contact.findByPk(id)
        .then(contact => {
            if (!contact) {
                return res.sendStatus(404);
            }

            contact.destroy()
                .then(() => {
                    res.sendStatus(204);
                });
        });
});

module.exports = router;