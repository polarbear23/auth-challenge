const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
        const createdUser = await prisma.user.create({
            data: {
                username,
                password: hash
            }
        });
        res.json({ data: createdUser });
    })
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    bcrypt.compare(password, foundUser.password, (err, result) => {
        const passwordsMatch = result;

        if (!passwordsMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ username }, jwtSecret);

        res.json({ token: token });
    })

};

module.exports = {
    register,
    login
};