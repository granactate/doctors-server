const constants = require("./../common/constants")
function middleware(authorize)
{
    return function (req, res, next)
    {
        let currentUser = req.currentUser;
        let valide = currentUser.type == 0;
        let auth = authorize["type_" + currentUser.type];
        valide ? void(0) : auth.paths.forEach(resource => {
            valide = valide || (req.originalUrl.indexOf(resource.url) > -1 && resource.method == req.method)
        })
        valide ? next() : res.status(401).send("Unauthorized");
    }

}
module.exports = middleware;

