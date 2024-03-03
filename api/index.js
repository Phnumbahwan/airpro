const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const CookieParser = require('cookie-parser');
const cheerio = require('cheerio');
const axios = require('axios');
require('dotenv').config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'hkhsajifmk459f0usaj2';

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const passOk = bcrypt.compareSync(password, user.password)
            if (passOk) {
                jwt.sign({ email: user.email, password: user._id, name: user.name }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({
                        message: 'Login success',
                        data: user
                    });
                });
            } else {
                res.status(422).json('Login failed');
            }
        } else {
            res.status(422).json('User not found');
        }
    } catch (error) {
        res.status(422).json(error)
    }
});

app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
})

// app.get('/csgo', async (req, res) => {
//     const url = 'https://steamcommunity.com/market/search?appid=730&q=m4';
//     const response = await axios.get(url);
//     res.json(response);
// const $ = cheerio.load(response.data);

// const items = [];
// $('a.market_listing_row_link').each((index, element) => {
//     const img = $(element).find('img');
//     const src = img.attr('src');

//     const div = $(element).find('div.market_listing_item_name');
//     const text = div.text().trim();

//     items.push({ src, text });
// });

// res.json({
//     items,
// });


// res.json(data);
// });

app.listen(4000);