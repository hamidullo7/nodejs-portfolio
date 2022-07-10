const express = require('express');
const router = express.Router();
var multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
// var upload = multer({ dest: 'uploads' })

var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname.substring(file.originalname.length-4));
    }
});

var upload = multer({ storage });


router.post('/upload', auth,  upload.single('file'), (req, res) => {
    if (req.file) {
        res.send(req.file.filename);
    } else {
        res.status(400).send("Xatolik sodir bo'ldi!");
    }
});

router.get('/image/:name', (req, res) => {
    if (fs.existsSync(__dirname.substring(0, __dirname.length - 6) + `/uploads/${req.params.name}`)) {
        res.sendFile(path.join(__dirname, `../uploads/${req.params.name}`));
    } else {
        res.status(400).send("Fayl topilmadi!");
    }
});

router.post('/del/:name', auth, (req, res) => {
    fs.unlink(__dirname.substring(0, __dirname.length - 6) + `/uploads/${req.params.name}`, (err) => {
        if (err) {
            return res.status(400).send("Fayl o'chirilmadi!");
        } else {
            return res.send("ok")
        }
    });
});

module.exports = router;
