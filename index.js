const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");
const helmet = require("helmet");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet);
server.use(router);

server.get("/", (req, res) => {
	res.send("Server running");
});

server.listen(5000, () => console.log("\nrunning on port 5000\n"));
