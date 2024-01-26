import express, { json } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import 'dotenv/config'
import User from './models/user.js'
import bcrypt from 'bcryptjs'
import { dbConnect } from "./DB/db.js";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
//DNhemTAHoLChhCYz pass

const PORT = 4000;
const portName = '127.0.0.1';

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'poiuytrewq';
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.get('/test', (req, res) => {
    res.json('test start')
});

// console.log(process.env.MONGO_URL);
// mongoose.connect(process.env.MONGO_URL);
app.post('/register', async (req, res) => {
    let result = await req.body;
    let { name, email, password } = await result.data;
    // res.send('got data')
    try {
        const userDoc = await User.create({
            name,
            password: bcrypt.hashSync(password, bcryptSalt),
            email
        })
        // res.send(userDoc)
        console.log(userDoc, 'userDoc');
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
            const {name,email,_id}= await User.findById(userData.id)
            res.json({name, email ,_id})
        })
    }
    else {
        res.json(null)
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})

app.listen(PORT, portName, async () => {
    await dbConnect()
    console.log(` server startted at http://${portName}:${PORT}`)
}) 