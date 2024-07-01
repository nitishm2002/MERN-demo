const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const { connection } = require("./src/connection/connection");

async function startServer() {
    app.use(cors({ origin: "*" }));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    // connection
    await connection();

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to demo website" });
    });

    const apiRouter = require("./src/routes/user.routes");

    // api initial path
    app.use("/api/v1", apiRouter);

    // Server listening
    app.listen(process.env.port, "0.0.0.0", () => {
        console.log(
            `Server listening on the port no http://localhost:${process.env.port}`
        );
    });
}

startServer();