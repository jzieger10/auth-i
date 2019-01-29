const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');
const middleware = require('../middleware/middleware.js');
const protected = middleware.protected;

router.route("/api/register").post((req, res) => {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 10);

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
				req.session.username = user.username;
				res.status(200).json({ message: `Welcome, ${user.username}! You're logged in` });
			} else {
				res.status(401).json({
					message:
						"You shall not pass! Incorrect username and/or password.",
				});
			}
		})
		.catch(err => res.status(500).json(err));
});

router.route("/api/logout").get((req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('Error logging out, please try again')
            } else {
                res.send('You\'ve been logged out')
            }
        })
    }
});

router.route("/api/restricted/users").get(protected, (req, res) => {
    console.log(req.session.id, req.session.username, req.session.admin)
        db("users")
            .select("id", "username", "admin")
            .then(users => {
                res.json(users);
            })
            .catch(err => res.status(500).json(err));
});

module.exports = router;
