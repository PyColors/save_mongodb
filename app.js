const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));


const dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
});


app.use(bodyParser.urlencoded({
    extended: false
}));


app.post('/post-thanks', function(req, res) {
    dbConn.then(function(db) {
        delete req.body._id;
        db.ccollection('information').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/thanks', function(req, res) {
    dbConn.then(function(db) {
        db.collection('information').find({}).toArray().then(function(information) {
            res.status(200).json(information);
        });
    });
});


app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
