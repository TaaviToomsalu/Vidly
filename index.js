const Joi = require('joi');
const express = require('express');
const app = express();



app.use(express.json());


const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'horror'},
    {id: 3, name: 'drama'}
];
    

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
};

app.get('/', (req, res) => {
    res.send(genres);
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body); //equivalent to getting result.error
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
      };
      genres.push(genre);
      res.send(genres);
  });



app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));



app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    const { error } = validateGenre(req.body); //equivalent to getting result.error
    if (error) return res.status(400).send(error.details[0].message);


    //Update course
    genre.name = req.body.name;
    //Return the updated course
    res.send(genre);
});




app.delete('/api/genres/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    
    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the same course
    res.send(genre)
});