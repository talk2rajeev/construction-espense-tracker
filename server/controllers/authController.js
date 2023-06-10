require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const handleErrors = (err) => {
    let errors = { username: '', password: '' };

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach( ({properties})  => {
            errors[properties.path] = properties.message; 
        })
    }
    return errors;
}

const signUpUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }
}

const getUserList = (req, res) => {
    User.find().then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in getting User list ', err));
}

const createToken = async (username) => {
    const MAX_AGE = 60 * 60;
    const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: MAX_AGE});
    return token;
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        
        const token = await createToken(user.username);
        const refresh_token = await createToken(user.username);
        res.status(200).json({id: user._id, access_token: token, refresh_token, exp: 3600});
        updateRefreshToken(user._id, refresh_token);
    } catch (err) {
        res.status(400).json({});
    }
}

const updateRefreshToken =  (userid, refresh_token) => {
    console.log(userid, refresh_token);
    User.findByIdAndUpdate({ _id: userid}, {"refreshToken": refresh_token})
    .then((result) => {
        console.log('refresh token updated')
    }).catch((err) => console.log('failed to updaet refresh token', err));
}


const getToken = (req, res) => {

    const id = req.body.id;
    const refresh_token = req.body.refresh_token;

    User.findById(id).then((result) => {
        
        if (result.refreshToken === refresh_token) {
            console.log('Ref token matched');
            jwt.verify(refresh_token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
                if (err) {
                    console.log('failed')
                    res.status(403).send({msg: 'invalid Refresh Token'});
                } else {
                    const access_token = await createToken(user.username);
                    const refresh_token = await createToken(user.username);
                    res.status(200).send({id: result._id, access_token, refresh_token,  exp: 3600});
                    updateRefreshToken(result._id, refresh_token);
                }
            });
        } else {
            console.log('Ref token mis-matched');
            res.status(403).json({msg: 'invalid Refresh Token'});
        }

    }).catch((err) => {
        res.status(500).send({ message: 'inside catch' });
    });
}


module.exports = {
    getUserList,
    signUpUser,
    loginUser,
    getToken,
}