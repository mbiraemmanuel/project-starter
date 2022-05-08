const express = require('express');
const router = express.Router();
const db = require('../models');
const { Job } = db;


router.get('/', (req, res) => {
    console.log('Fetching all jobs');
    Job.findAll({})
        .then(jobs => res.json(jobs));
    }
);

router.post('/', (req, res) => {
    console.log('Saving new job', req.body.content);
    let { type, description, cost, status, machine_id, contact_id } = req.body.content;
    
    Job.create({ type, description, cost, status })
        .then(job => {
            res.status(201).json(job);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    }
);

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Job.findByPk(id)
        .then(job => {
            if (!job) {
                return res.sendStatus(404);
            }

            res.json(job);
        });
    }
);

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Job.findByPk(id)
        .then(job => {
            if (!job) {
                return res.sendStatus(404);
            }

            job.status = req.body.status;
            job.model = req.body.model;
            job.total_wash_count = req.body.total_wash_count;
            job.save()
                .then(job => {
                    res.json(job);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
    }
);

router.delete('/:id', (req, res) => {
    console.log('Deleting job', req.params.id);
    const { id } = req.params;
    Job.findByPk(id)
        .then(job => {
            if (!job) {
                return res.sendStatus(404);
            }

            job.destroy()
            res.sendStatus(204);
        });
    }
);

module.exports = router;