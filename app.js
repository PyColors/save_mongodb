const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
});


const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/post-thanks', function(req, res) {
    dbConn.then(function(db) {
        delete req.body._id;
        db.ccollection('information').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/thanks', function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});


app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
