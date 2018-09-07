const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').objectID;


// Connect

const connection = (closure) => {
    return MongoClient.connect('mongodb://meanoneusr:abc123@67.227.236.181:27017/meanone',(err , db) =>{
        if (err) return console.log(err);

        closure(db);
    });
};





//Error handling
const sendError = (err,res) =>{
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

//Response handling

let response = {
    status: 200,
    data: [],
    message: null
};

// Get users

router.get('/videos',(req,res) => {
    connection((db) => {
        db.collection('videos')
           .find()
           .toArray()
           .then((videos) => {
               response.data = videos;
               res.json(response);
           })
           .catch((err) => {
               sendError(err, res);
           });
    });
});

module.exports = router;
