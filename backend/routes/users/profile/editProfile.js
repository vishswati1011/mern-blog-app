const express = require('express');
const router = express.Router();
const User = require('../../../models/users/users');
const multer = require('multer');
const fs = require('fs');
const du = require('du');
const path = require('path');
const { gcpUploadUserDoc } = require('../../../utilies/gcpUploadUserDoc');
const ObjectId = require('mongodb').ObjectId;

const storage = multer.diskStorage({
    destination: async (req, file, cd) => {
        const { userId } = req;
        try {
            if (!fs.existsSync(`ed-assets/${userId}/profileImage`)) {
                fs.mkdir(`ed-assets/${userId}/profileImage`, { recursive: true }, async err => {
                    cd(null, `ed-assets/${userId}/profileImage/`);
                });
            } else {
                const size = await du(`ed-assets/${userId}`);
                cd(null, `ed-assets/${userId}/profileImage/`);
            }
        } catch (error) {
            console.error('error', error);
        }
    },
    filename: (req, file, cb) =>
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024,
    },
});

router.post('/', upload.single('profile-attach'), gcpUploadUserDoc, async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        console.log(user,userId)
        const { username } = req.body;
        if (!user) {
            return res.status(400).json({
                message: 'No user found.',
            });
        } else {
            let image = user?.imageUrl;
            if (req?.profileImg) {
                image = req.profileImg;
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: user._id },
                    { $set: { imageUrl: image, username: username } },
                    {new:true}
                );

                if (updatedUser) {
                    // Return only the updated fields in the response
                    const updatedFields = {
                        image: updatedUser.imageUrl,
                        username: updatedUser.username,
                    };
                    fs.rmdir(`ed-assets`, { recursive: true }, (err) => {
                        if (err) {
                          console.error(`Error deleting folder: ${err}`);
                        } else {
                          console.log('Folder deleted successfully.');
                        }
                      });
                    res.status(200).json({
                        message: 'Profile updated successfully.',
                        data: updatedFields,
                    });
                } else {
                    res.status(404).json({ message: 'User not found.' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: `Failed to fetch users.`,
            error: err.message,
        });
    }
});
module.exports = router;
