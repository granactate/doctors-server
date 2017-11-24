let admin = {
    type: 0
}
let doctor = {
    type: 1,
//    _id: "5a16618785eba62f8c830c35"
//sin paciente
//    _id: "5a1662528bd4102f147f31b2"
//    con paciente
    _id: "5a16618785eba62f8c830c35" //paciente: 5a1674a01158401fd8695b8e
}
let app = {
    type: 2,
    patient: {
        _id: "5a1674ad1158401fd8695b90"
    }
}

module.exports = {
    current_user_logged: doctor,
    SECRET: "Eliecer Alejandro Molina Vergel"
}