const express = require('express');

const { body } = require('express-validator');

const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');

const router = express.Router();



router.get('/', auth, postsController.fetchAll);

router.get('/:id', auth, postsController.getPost);

router.get('/tests/:id', auth, postsController.getTest);

router.get('/tests/id/:id', auth, postsController.getTestId);

router.get('/getbyname/:name', auth, postsController.getPacienteName);

router.post('/points', [auth,
        body('paciente_id').trim().isLength({ min: 1 }).not().isEmpty(),
        body('visoespacial').trim().isLength({ min: 1 }).not().isEmpty(),
        body('atencion').trim().not().isEmpty(),
        body('recuerdodiferido').trim().not().isEmpty(),
        body('memoria').trim().isLength({ min: 1 }).not().isEmpty(),
        body('denominacion').trim().isLength({ min: 1 }).not().isEmpty(),
        body('lenguaje').trim().not().isEmpty(),
        body('abstraccion').trim().not().isEmpty(),
        body('orientacion').trim().not().isEmpty(),
        body('total').trim().not().isEmpty()
        // paciente_id,
        // visoespacial,
        // atencion,
        // recuerdodiferido,
        // memoria,
        // denominacion,
        // lenguaje,
        // abstraccion,
        // orientacion,
        // total,

    ],
    postsController.postPuntaje
);

router.post(
    '/', [
        auth,
        body('name').trim().isLength({ min: 5 }).not().isEmpty(),
        body('fechanac').trim().isLength({ min: 10 }).not().isEmpty(),
        body('escolaridad').trim().not().isEmpty(),
        body('quejaMemoria').trim().not().isEmpty(),

    ],
    postsController.postPost
);

router.delete('/:id', postsController.deletePost);



module.exports = router;