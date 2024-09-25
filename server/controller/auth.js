const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret, jwtRefreshSecret, jwtExpiration } = require('../config/keys')
const Customer = require('../db/auth')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Customer.getCustomerByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const accessToken = jwt.sign({ user: user  }, jwtSecret, {
            //expiresIn: jwtExpiration
        });

        // Generate Refresh Token
        const refreshToken = jwt.sign({ user: user}, jwtRefreshSecret);

        console.log("server login controller")
        return res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

exports.signup = async (req, res) => {
    console.log(req.body)
    const { first_name, last_name, email, password, phone_number, address, zone } = req.body;

    try {
        // Check if the user already exists
        let user = await Customer.getCustomerByEmail(email);
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user
        console.log('line before inserting customer')
        user = await Customer.insertCustomer({ first_name, last_name, email, hashPassword, phone_number, address, zone });
        console.log('returned' + user)
        // Hash the password

        // Generate JWT
        const accessToken = jwt.sign({ user: user }, jwtSecret, {
            // expiresIn: jwtExpiration
        });

        const refreshToken = jwt.sign({ user: user }, jwtRefreshSecret);

        res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.refresh = async (req, res) => {
    try {
        const refreshToken  = req.headers.refreshtoken;

        // Verify refresh token
        jwt.verify(refreshToken, jwtRefreshSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }
            console.log(decoded)
            // Generate new access token
            const accessToken = jwt.sign({ user: decoded.user }, jwtSecret, {
                expiresIn: jwtExpiration
            });
            const newRefreshToken = jwt.sign({ user: decoded.user }, jwtRefreshSecret);

            res.json({ accessToken: accessToken, refreshToken: newRefreshToken });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}