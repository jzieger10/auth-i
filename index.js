const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");
const helmet = require("helmet");
const server = express();
const session = require("express-session");


server.use(
	session({
		name: "notsession", // default is connect.sid
		secret: "nobody tosses a dwarf!",
		cookie: {
			maxAge: 1 * 24 * 60 * 60 * 1000,
			secure: false, // only set cookies over https. Server will not send back a cookie over http.
		}, // 1 day in milliseconds
		httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
		resave: false,
		saveUninitialized: true,
	})
);
server.use(express.json());
server.use(cors());

server.use(helmet());
server.use(router);

server.get("/", (req, res) => {
	res.send("Server running");
});

// server.get("/setname", (req, res) => {
// 	req.session.name = "Frodo";
// 	res.send("Got it");
// });

// server.get("/getname", (req, res) => {
// 	const name = req.session.name;
// 	res.send(`Hello ${name}`);
// });

server.listen(5000, () => console.log("\nrunning on port 5000\n"));
