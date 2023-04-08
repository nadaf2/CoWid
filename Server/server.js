const express = require("express");
const app = express();
app.use(express.static("./Widget"));
port = 5000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
