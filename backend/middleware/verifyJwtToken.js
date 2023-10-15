const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;
const Users = require('../models/users/users');
const Admin = require('../models/admin/admin');
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
    }
    return res.sendStatus(401).send({ message: 'Unauthorized!' });
};

verifyUserToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return catchError(err, res);
            }
            Users.findById(decoded?._doc?._id)
                .then(user => {

                    if (!user) {
                        res.status(401).json({ message: 'Unauthorised,User not found' });
                    } else {
                        req.userId = decoded?._doc?._id;
                        req.email = decoded?._doc?.email;
                        req.name = decoded?._doc?.username
                        
                        next();
                    }
                })
                .catch(error => {
                    res.status(400).json({ message: error.message });
                });
        });
    }
};

verifyAdminToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY , (err, decoded) => {
            if (err) {
                return catchError(err, res);
            }
            Admin.findById(decoded?._doc?._id)
                .then(user => {
                    if (!user) {
                        res.status(401).json({ message: 'Unauthorised,User not found' });
                    } else {
                        next();
                    }
                })
                .catch(error => {
                    res.status(400).json({ message: error.message });
                });
        });
    }
};
//https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/

const authJwt = {
    verifyUserToken,
    verifyAdminToken,
};

module.exports = authJwt;
