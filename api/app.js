const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.js');
const CookieParser = require('cookie-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const Place = require('./models/Place.js');
const { validationResult } = require('express-validator');
const PlaceRequest = require('./request/PlaceRequest.js');
require('dotenv').config();
const app = express();
const AuthRoutes = require('./auth/auth-routes');

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use('/auth', AuthRoutes);

module.exports = app;

// app.get('/profile', async (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//         jwt.verify(token, jwtSecret, {}, (err, user) => {
//             if (err) throw err;
//             res.json(user);
//         });
//     } else {
//         res.json(null);
//     }
// });

// app.post('/places', PlaceRequest, (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { token } = req.cookies;
//     const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         console.log(userData);
//         if (err) throw err;
//         const place = await Place.create({
//             owner: userData.id,
//             title,
//             address,
//             photos: addedPhotos,
//             description,
//             perks,
//             extraInfo,
//             checkIn,
//             checkOut,
//             maxGuests
//         });

//         res.json(place);
//     })
// })

// app.get('/places', (req, res) => {
//     const { token } = req.cookies;
//     try {
//         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//             if (err) throw err;
//             const { id } = userData;
//             const places = await Place.find({ owner: id });
//             res.json(places);
//         })
//     } catch (error) {
//         res.status(422).json(error)
//     }
// })

// app.get('/places/:id', async (req, res) => {
//     const { id } = req.params;
//     res.json(await Place.findOne({ _id: id }));
// })