
const { Storage } = require('@google-cloud/storage');

// Initialize storage
const storage = new Storage({
    keyFilename: `./backend-files-bucket.json`,
});

const bucketName = 'backend-files-bucket';
const bucket = storage.bucket(bucketName);

const gcpUploadUserDoc = (req, res, next) => {
    const { userId } = req;

    // Sending the upload request
    return bucket.upload(
        `ed-assets/${userId}/profileImage/${req.file.filename}`,
        {
            destination: `ed-assets/${userId}/profileImage/${req.file.filename}`,
        },
        function (err, file) {
            if (err) {
                console.error(`Error uploading image  ${err}`);
                res.json({ message: 'Error Uploading image' });
            } else {
                // Making file public to the internet
                file.makePublic(async function (err) {
                    if (err) {
                        console.error(`Error making file public: ${err}`);
                    } else {
                        const publicUrl = file.publicUrl();
                        req.profileImg = publicUrl;
                        next();
                    }
                });
            }
        }
    );
};

module.exports={gcpUploadUserDoc}