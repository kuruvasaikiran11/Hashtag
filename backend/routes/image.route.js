// const express = require('express');
// const router = express.Router();
// const { uploadImage, getImages } = require('../controllers/image.controller');

// router.post('/upload', uploadImage);
// router.get('/', getImages);

// module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const { uploadImage, getImages } = require('../controllers/image.controller');
// const router = express.Router();

// const upload = multer({ dest: 'uploads/' }); // Configure multer as needed

// router.post('/upload', upload.single('image'), uploadImage);
// router.get('/', getImages);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImage, getImages } = require('../controllers/image.controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);

module.exports = router;
