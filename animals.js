const express = require('express');
const router =  express.Router();
const mongoose = require ('mongoose');

const Animals = require('../models/animals');

router.get("/", (req, res, next) => {
    Animals.find()
        .exec()
        .then(docs => {
            console.log(docs);
           // if(docs.length >=0) {
                res.status(200).json(docs);
          //  }else{
           //     res.status(404).json({
            //        message: 'No entries found'
             //   });
            //}
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.post("/", (req, res, next) => {
    const animals = new Animals({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category: req.body.category
    });
    animals
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /animals",
                createdAnimals: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:animalsId", (req, res, next) => {
    const id = req.params.animalsId;
    Animals.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc) {
                res.status(200).json(doc);
            }else {
                res.status(404).json({message: "No valid  entry found for provided ID"});
            }
})
    .catch( err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});
    router.patch('/:animalsId', (req, res, next) => {
        const id = req.params.animalsId;
        const updateOps =  {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
       Animals.update({_id: id}, {$set: updateOps })
           .exec()
           .then(result => {
               console.log(result);
               res.status(200).json(result);
               })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error:err
               });
           });
    });
    router.delete('/:animalsId', (req, res, next) => {
        const id = req.params.animalsId;
        Animals.remove({_id: id})
            .exec()
            .then(result =>{
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

    module.exports = router;