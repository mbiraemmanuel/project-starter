const express = require('express');
const router = express.Router();
const db = require('../models');
const { Machine } = db;


router.get('/', (req, res) => {
    Machine.findAll({})
        .then(machines => res.json(machines));
});

router.post('/', (req, res) => {
    let { status, model, total_wash_count } = req.body;
    Machine.create({ status, model, total_wash_count })
        .then(machine => {
            res.status(201).json(machine);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Machine.findByPk(id)
        .then(machine => {
            if (!machine) {
                return res.sendStatus(404);
            }

            res.json(machine);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Machine.findByPk(id)
        .then(machine => {
            if (!machine) {
                return res.sendStatus(404);
            }

            machine.status = req.body.status;
            machine.model = req.body.model;
            machine.total_wash_count = req.body.total_wash_count;
            machine.save()
                .then(machine => {
                    res.json(machine);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Machine.findByPk(id)
        .then(machine => {
            if (!machine) {
                return res.sendStatus(404);
            }

            machine.destroy()
                .then(() => {
                    res.sendStatus(204);
                });
        });
});

module.exports = router;

