const { validationResult } = require('express-validator');

const Post = require('../models/post');



exports.fetchAll = async(req, res, next) => {
    try {
        const [allPosts] = await Post.fetchAll();
        res.status(200).json(allPosts);
        // console.log(allPosts);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postPost = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const name = req.body.name;
    const fechanac = req.body.fechanac;
    const escolaridad = req.body.escolaridad;
    const quejaMemoria = req.body.quejaMemoria;

    try {
        const post = {
            name: name,
            fechanac: fechanac,
            escolaridad: escolaridad,
            quejaMemoria: quejaMemoria

        };
        const result = await Post.save(post);
        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// postPuntaje

exports.postPuntaje = async(req, res, next) => {
    console.log('Entra a post Puntaje en controllers');
    // paciente_id, visoespacial, atencion, recuerdodiferido, memoria, denominacion, lenguaje, abstraccion, orientacion, total
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;
    const paciente_id = req.body.paciente_id;
    const visoespacial = req.body.visoespacial;
    const atencion = req.body.atencion;
    const recuerdodiferido = req.body.recuerdodiferido;
    const memoria = req.body.memoria;
    const denominacion = req.body.denominacion;
    const lenguaje = req.body.lenguaje;
    const abstraccion = req.body.abstraccion;
    const orientacion = req.body.orientacion;
    const total = req.body.total;

    try {
        const test = {
            paciente_id: paciente_id,
            visoespacial: visoespacial,
            atencion: atencion,
            recuerdodiferido: recuerdodiferido,
            memoria: memoria,
            denominacion: denominacion,
            lenguaje: lenguaje,
            abstraccion: abstraccion,
            orientacion: orientacion,
            total: total

        }
        console.log('Entra a try en controller: ', test);
        const result = await Post.postPoints(test);
        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        console.log('Entra a catch en controller: ');

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deletePost = async(req, res, next) => {
    try {
        console.log("Entra a deletePost: ", req.params.id);
        const deleteResponse = await Post.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getPacienteName = async(req, res, next) => {
    try {
        console.log('Entra a getPacienteName: ', req.params.name);
        const [allPosts] = await Post.getPacienteName(req.params.name);
        res.status(200).json(allPosts);
        console.log(allPosts);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getPost = async(req, res, next) => {
    try {
        const [allPosts] = await Post.getPaciente(req.params.id);
        res.status(200).json(allPosts);
        console.log(allPosts);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTest = async(req, res, next) => {
    console.log('Entra a getTests controllers: ', req.params.id);
    try {
        const [allPosts] = await Post.getTest(req.params.id);
        res.status(200).json(allPosts);
        console.log(allPosts);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTestId = async(req, res, next) => {
    console.log('Entra a getTests controllers: ', req.params.id);
    try {
        const [allPosts] = await Post.getTestId(req.params.id);
        res.status(200).json(allPosts);
        console.log(allPosts);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};