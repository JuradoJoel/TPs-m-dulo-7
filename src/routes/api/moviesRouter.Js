const express = require('express');
const router = express.Router();
const { list, detail, create, update, destroy} = require('../../controllers/api/moviesController');

router
    .get('/', list)
    .get('/:id', detail)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', destroy)

module.exports = router; 