const mongoose = require("./../database/mongoose");
const constants = require("./../common/constants");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
let cols = {
    type: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        __partOfCrendential: true,
        validate: {
            validator: validator.isEmail,
            message: "Isnt a valid email"
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 5,
        __partOfCrendential: true,
    },
    token: {
        type: String
    }

};
let UserSchema = new mongoose.Schema(cols)

UserSchema.pre("save", function (next) {
    var user = this
    user.isModified("password") ? bcrypt.hash(user.password, 12, function (err, hash) {
        user.password = hash;
        next();
    }) : next();
})

UserSchema.methods.createToken = function ()
{
    let user = this;
    user.token = jwt.sign({_id: user._id.toHexString(), username: user.username}, constants.SECRET).toString();
    return user.save().then(() => {
        return user.token
    });
}
UserSchema.methods.deleteToken = function (token)
{
    return this.update({token: null})
}

UserSchema.statics.findByCredentials = function (credentials)
{
    var User = this;
    return User.findOne({email: credentials.email})
            .then((user) => {
                return !user ? null : bcrypt.compare(credentials.password, user.password).then((result) => {
                    console.log(credentials.password, user.password, result)
                    return result ? user : null;
                })
            })
}

UserSchema.statics.findByToken = function (token)
{
    try
    {
        var User = this;
        let userTokenized = jwt.verify(token, constants.SECRET)
        return User.findOne({
            "_id": userTokenized._id,
            "token": token
        })
    } catch (e)
    {
        return Promise.resolve(null)
    }

}

UserSchema.statics.getAttributes = function ()
{
    return Object.keys(cols)
}
UserSchema.statics.getAttributesCredentials = function ()
{
    let colsCredentials = [];
    for (let att in cols)
    {
        if (cols[att].__partOfCrendential === true)
        {
            colsCredentials.push(att);
        }

    }
    return colsCredentials;
}
var User = mongoose.model("User", UserSchema)
module.exports = User;