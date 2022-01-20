require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path')
const fileUpload = require('express-fileupload');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const authRouter = require('./routes/auth.router')
const restRouter = require('./routes/restaurant.router')
const app = express();
const { User } = require('./db/models')
const { userRouter } = require("./routes/user.router");

const PORT = process.env.PORT ?? 3002;

// const cloudinary = require('cloudinary').v2; // get api key https://cloudinary.com/users/register/free and add to .env CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name

// const app = express();

// app.use(express.static(`${process.env.PWD}/public`));
app.use(fileUpload());
app.use(express.static(path.join(process.env.PWD, 'public')))

// const uploadsDir = `http://localhost:3002/public/uploads`;

// app.post('/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('Ни один файл не был загружен.');
//   }
//   const sampleFile = req.files.file;
//   const filename = `${new Date().getTime()}_${sampleFile.name}`;

//   sampleFile.mv(`${uploadsDir}/${filename}`, (err) => {
//     if (err) return res.status(500).send(err);
//     // cloudinary.uploader
//     const cld = await Pictures.upload(`${uploadsDir}/${filename}`);
//     console.log('cloudinary url', cld.url);

//     res.json('Файл загружен!');
//   });
// });

//
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO: add secret from .env
app.use(session({
  name: 'auth',
  secret: 'qwerty',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({}),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
  },
}))


app.use('/api/auth', authRouter)
app.use('/api/restaurants', restRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT`, PORT);
});
