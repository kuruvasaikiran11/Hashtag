// const Image = require('../models/image.model');
// const User = require('../models/user.model');

// // Upload image
// const uploadImage = async (req, res) => {
//     try {
//         const { url, hashtags, uploadedBy } = req.body;

//         // Verify the user exists by username
//         const user = await User.findOne({ username: uploadedBy });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Create a new image using the user's _id
//         const image = new Image({
//             url,
//             hashtags: hashtags.split(',').map(tag => tag.trim()), // Split hashtags into an array
//             uploadedBy: user._id
//         });

//         const savedImage = await image.save();

//         // Populate the uploadedBy field with the username
//         const populatedImage = await Image.findById(savedImage._id).populate('uploadedBy', 'username');

//         res.status(201).json(populatedImage);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all images with hashtags
// const getImages = async (req, res) => {
//     try {
//         const images = await Image.find().populate('uploadedBy', 'username email');
//         res.status(200).json(images);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     uploadImage,
//     getImages
// };

const Image = require('../models/image.model');
const User = require('../models/user.model');

const uploadImage = async (req, res) => {
    try {
        const { hashtags, uploadedBy } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File received:', file);
        console.log('Hashtags received:', hashtags);
        console.log('Uploaded by:', uploadedBy);

        const user = await User.findOne({ username: uploadedBy });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const url = `/uploads/${file.filename}`;

        const image = new Image({
            url,
            hashtags: hashtags.split(',').map(tag => tag.trim()),
            uploadedBy: user._id
        });

        const savedImage = await image.save();

        const populatedImage = await Image.findById(savedImage._id).populate('uploadedBy', 'username');

        res.status(201).json(populatedImage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const getImages = async (req, res) => {
    try {
        const images = await Image.find().populate('uploadedBy', 'username email');
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadImage,
    getImages
};
