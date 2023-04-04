const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async ({ email, username, password, address }) => {
    const secret = process.env.SECRET; //Hash secret phrase taken from .env outside the repository.
    const newUser = await new User({ email, username, password, address }).save();
    const newUserDTO = {
        email: newUser.email,
        username: newUser.username,
        address: newUser.address
    };

    const token = jwt.sign({ username: newUser.username, address: newUser.address }, secret, {
        expiresIn: "2h",
    });

    return { newUserDTO, token }
}

const login = async ( email ) => {
    const secret = process.env.SECRET; // Hash secret phrase taken from .env outside the repository.
    const user = await User.findOne({ email });

    const userDTO = {
        email: user.email,
        username: user.username,
        address: user.address
    }

    const token = jwt.sign({ email: user.email, username: user.username, address: user.address }, secret, {
        expiresIn: "2h",
    });
    return { userDTO, token };
};

module.exports = { register, login };