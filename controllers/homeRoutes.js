const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

//home page
router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ["username"],
        }, {
            model: Comment,
            include: [{
                model: User,
                attributes: ["username"]
            }]
        }]
    });
    res.render('homepage', {
        posts: postData,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    });
});

//login page
router.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).json(error)
    }
})

//dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ["username"],
            }]
        })
        res.render('dashboard', {
            posts: postData,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;