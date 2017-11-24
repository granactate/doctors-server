const constants = require("./../common/constants")
const User = require("./../models/user.model");
function middleware(onlyAuth, onlyNoAuth)
{
    return function (req, res, next)
    {
        let token = req.header("x-auth")
        User.findByToken(token)
                .then((user) => {

                    if (!user && onlyAuth || user && onlyNoAuth)
                    {
                        return res.status(401).send("Unauthorized");
                    }
                    req.currentUser = user;
                    req.token = token;
                    next();

                })
                .catch((e) => {
                    res.status(401).send(e)
                })

    }

}
module.exports = middleware;

