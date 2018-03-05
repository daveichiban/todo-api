const mongoose = require("mongoose");
const validator = require("validator");

var User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        acccess: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]

});

module.exports = {User};