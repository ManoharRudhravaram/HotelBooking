const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user.js');
const Place = require('./models/Place.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const { dbConnect } = require('./DB/db.js');
const multer = require('multer')
const fs = require('fs');
//DNhemTAHoLChhCYz pass

const PORT = 4000;
const portName = '127.0.0.1';

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'poiuytrewq';
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors())

app.get('/test', (req, res) => {
    res.json('test start')
});

app.post('/register', async (req, res) => {
    let result = await req.body;
    let { name, email, password } = await result.data;
    try {
        const userDoc = await User.create({
            name,
            password: bcrypt.hashSync(password, bcryptSalt),
            email
        })
        res.json(userDoc)
    }
    catch (err) {
        res.status(404).json(err)
    }
})

app.post('/login', async (req, res) => {
    let result = await req.body;
    let { email, password } = await result.loginData;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        }
        else {
            res.status(422).json('pass not ok')
        }
    }
    else {
        res.json('not found')
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id })
        })
    }
    else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
    let { link } = req.body;
    console.log(link);
    const newName = 'photo' + Date.now() + '.jpg'
    console.log(newName);
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})

const photosMiddleWare = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i <= req.files.length-1; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newpath = path + '.' + ext;
        fs.renameSync(path, newpath);
        uploadedFiles.push(newpath.replace('uploads', ''));
    }
    res.json(uploadedFiles);
})

app.listen(PORT, portName, async () => {
    await dbConnect()
    console.log(` server startted at http://${portName}:${PORT}`)
}) 