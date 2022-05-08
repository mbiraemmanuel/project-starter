const express = require('express');
const router = express.Router();
const db = require('../models');
const { Pickup_Request } = db;


router.get('/', (req, res) => {
    Pickup_Request.findAll({})
        .then(pickup_requests => res.json(pickup_requests));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Pickup_Request.findByPk(id)
        .then(pickup_request => {
            if (!pickup_request) {
                return res.sendStatus(404);
            }

            res.json(pickup_request);
        });
});

router.post('/', (req, res) => {
    let { pickup_location, pickup_date, pickup_time, pickup_address, pickup_city, pickup_state, pickup_zip, pickup_phone, pickup_email, pickup_instructions, pickup_status } = req.body;
    Pickup_Request.create({ pickup_location, pickup_date, pickup_time, pickup_address, pickup_city, pickup_state, pickup_zip, pickup_phone, pickup_email, pickup_instructions, pickup_status })
        .then(pickup_request => {
            res.status(201).json(pickup_request);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Pickup_Request.findByPk(id)
        .then(pickup_request => {
            if (!pickup_request) {
                return res.sendStatus(404);
            }

            pickup_request.pickup_location = req.body.pickup_location;
            pickup_request.pickup_date = req.body.pickup_date;
            pickup_request.pickup_time = req.body.pickup_time;
            pickup_request.pickup_address = req.body.pickup_address;
            pickup_request.pickup_city = req.body.pickup_city;
            pickup_request.pickup_state = req.body.pickup_state;
            pickup_request.pickup_zip = req.body.pickup_zip;
            pickup_request.pickup_phone = req.body.pickup_phone;
            pickup_request.pickup_email = req.body.pickup_email;
            pickup_request.pickup_instructions = req.body.pickup_instructions;
            pickup_request.pickup_status = req.body.pickup_status;
            pickup_request.save()
                .then(pickup_request => {
                    res.json(pickup_request);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Pickup_Request.findByPk(id)
        .then(pickup_request => {
            if (!pickup_request) {
                return res.sendStatus(404);
            }

            pickup_request.destroy()
                .then(() => {
                    res.sendStatus(204);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
});

module.exports = router;

