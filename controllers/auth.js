const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Post = require('../models/post');

// Pacientes fetch all
exports.fetchAll = async(req, res, next) => {
    try {
        const [allUsers] = await Post.fetchAll();
        res.status(200).json(allUsers);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.signup = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const protype = req.body.protype;


    try {
        // const saltRounds = 10;
        // const salt = bycript.genSalt(saltRounds);
        // console.log(salt);
        const saltRounds = 10;
        const hashcode = await bcrypt
            .genSalt(saltRounds)
            .then(salt => {
                console.log(`Salt: ${salt}`);
                return bcrypt.hash(password, salt);
            })
            .then(hash => {
                console.log(`Hash: ${hash}`);
                var hashcode = hash;
                return hashcode
            })
            .catch(err => console.error(err.message));
        // const hashedPassword = await bycript.hash(password, bycript.genSalt(saltRounds));
        console.log(hashcode);
        const userDetails = {
            name: name,
            email: email,
            password: hashcode,
            protype: protype
        };

        const result = await User.save(userDetails);

        res.status(200).json({ message: 'User registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.find(email);

        if (user[0].length !== 1) {
            console.log('A user with this email could not be found.');
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];



        console.log('pass ingresada: ', password, 'pass bd: ', storedUser.password);
        const isEqual = await bcrypt.compare(password, storedUser.password);


        console.log(isEqual);
        if (!isEqual) {
            console.log('equal: ', isEqual);

            console.log('Wrong password!');
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        // if (isEqual) {
        console.log('equal: ', isEqual);
        const token = jwt.sign({
                email: storedUser.email,
                userId: storedUser.id,
            },
            'secretfortoken', { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: storedUser.id });
        // }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Obtener usuario por id
exports.getUser = async(req, res, next) => {
    try {
        console.log('Entra a try con id: ', req.params.id);
        const [allPosts] = await User.getUser(req.params.id);
        res.status(200).json(allPosts);
        console.log(allPosts);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};