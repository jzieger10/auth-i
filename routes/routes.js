const express = require('express')
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);

router.route("/api/register").post((req, res) => {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 14);

	db("users")
		.insert(userInfo)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

router.route("/api/login").post((req, res) => {
	const userInfo = req.body;

	db("users")
		.where({ username: userInfo.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(userInfo.password, user.password)) {
				res.status(200).json({ message: "Welcome! You're logged in" });
			} else {
				res.status(401).json({
					message:
						"You shall not pass! Incorrect username and/or password.",
				});
			}
		})
		.catch(err => res.status(500).json(err));
});

router.route("/api/users").get((req, res) => {
	db("users")
		.select("id", "username")
		.then(users => {
			res.json(users);
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;