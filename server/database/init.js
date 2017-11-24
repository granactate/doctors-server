console.log("Init App Data")
const mongoose = require("./mongoose");
const User = require("./../models/user.model")
const userdata = {
    type: 0,
    email: "admin@kubesoft.com",
    password: "12345"
};
let user = new User(userdata);
user.save()
        .then((user) => {
            console.log("User was create", userdata)
            console.log("App Data Was Init")
            mongoose.connection.close();
        })
        .catch((error) => console.log("User wasnt created. Something went wrong", userdata, error));

