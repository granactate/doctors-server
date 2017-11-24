const User = require("./../models/user.model");
const _ = require("lodash");
function AuthController()
{
    this.login = function (req, res)
    {
        let credentials = _.pick(req.body, User.getAttributesCredentials())
        let userLogged = null;
        User.findByCredentials(credentials)
                .then((user) => {
                    userLogged = user;
                    return !userLogged ? Promise.resolve(null) : userLogged.createToken();
                })
                .then((token) => {
                    if (token)
                    {
                        res.header("x-auth", token)
                        res.send({status: 1, description: "Login successfully", data: {
                                user: userLogged, token: token
                            }})
                        return;
                    }
                    res.send({status: -1, description: "Login failed", data: credentials})
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send({status: 1, description: "an error ocurred", data: error})
                })
    }
    this.logout = function (req, res)
    {
        req.currentUser.deleteToken()
                .then((data) => {
                    data ? res.send({status: 1, description: "logout successfully", data: data}) :
                            res.status(500).send({status: .1, description: "logout failed"})
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send({status: .1, description: "logout failed", data: error})
                })

    }



    return this;
}



module.exports = AuthController();


