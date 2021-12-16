const express = require('express');
const job = require('./routes/job.js');
const users = require('./routes/user.js');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
// const mongoString = 'mongodb://127.0.0.1/job_app' // local
// mongoose.connect(mongoString, { useNewUrlParser: true })
const { MongoClient } = require('mongodb');
const mongoString = "mongodb+srv://rainbow:123abc789@cluster0.ehqng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoString, {useNewUrlParser: true}); 
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

// app.use(session({secret: "SUPER_DUPER_SECRET"}));
app.use(session({secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/job', job);  
app.use('/api/users', users);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes 

app.use(express.static(path.join(__dirname, "build")));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  

app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
});
