const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');


// Create account
router.post('/register', async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            if (err) return next(err);
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.redirect('/')
        });

        // return res.render('homepage', {
        //   logged_in: req.session.logged_in
        // });

    } catch (error) {
        return res.render('homepage', { error });
    }
});

// Login User 
router.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('You need to provide a username and password');
        }
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {

            req.session.regenerate((err) => {
                if (err) next(err)

                req.session.user_id = user.id;
                req.session.logged_in = true;

                req.session.save((err) => {
                    if (err) return next(err);
                    res.redirect('/')
                })
            })
        } else {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error)
    }
});

// Logout User 
router.get('/logout', async (req, res) => {
    req.session.user_id = null;
    req.session.logged_in = false;
    req.session.save((err) => {
        if (err) next(err);

        req.session.regenerate((err) => {
            if (err) next(err);
            res.redirect('/')
        })
    });
});

module.exports = router;