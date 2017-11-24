const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const public = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();


app.use(express.static(public))
app.use(bodyParser.json());
app.use("/auth", require("./routes/auth.routes"))
app.use("/doctor", require("./routes/doctor.routes"))
app.use("/patient", require("./routes/patient.routes"))

app.listen(port, () => {
    console.log("Server listening on " + port)
})