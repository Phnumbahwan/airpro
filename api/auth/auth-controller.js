const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'hkhsajifmk459f0usaj2';

const register = async (req, res) => {
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
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const passOk = bcrypt.compareSync(password, user.password)
            if (passOk) {
                jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, {}, (err, token) => {
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
        res.status(422).json(req)
    }
};

const logout = async (req, res) => {
    res.cookie('token', '').json(true);
};

module.exports = {
    register,
    login,
    logout
};