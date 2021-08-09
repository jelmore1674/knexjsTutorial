const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();
const arr = [];
// Req Obj as JSON
app.use(express.json());
// CORS Header to avoid errors
app.use(cors());
// enable CORS without external module
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// connect to postgres
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'knex',
    },
});
app.get('/', async(req, res) => {
    const users = await db.select('*').from('users');
    res.status(201).json(users);
});

app.post('/', async(req, res) => {
    const { name, email } = req.body;
    const newUser = {
        name: name,
        email: email,
    };
    let user = await db.insert(newUser, '*').into('users');
    res.status(201).json({ message: 'successfully added user', user: user[0] });
});

app.listen(process.env.PORT || 4500, () => {
    console.log('Server Is Running!');
});