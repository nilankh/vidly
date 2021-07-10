const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
})

const Genre = new mongoose.model('Genre', genreSchema);


router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/', (req, res)=> {
    const {error} = validationGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    })
})