const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Adoptions were fetched'
    });
});
router.post('/', (req, res, next) => {
    const adoption = {
        animalsId: req.body.animalsId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Adoptions were created',
        adoption: adoption
    });
});

router.get('/:adoptionId', (req, res, next) => {
    res.status(200).json({
        message: 'Adoption details',
        adoptionId: req.params.adoptionId
    });
});
router.delete('/:adoptionId', (req, res, next) => {
    res.status(200).json({
        message: 'Adoption deleted',
        adoptionId: req.params.adoptionId
    });
});

module.exports = router;