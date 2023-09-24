const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
          model: User,
          attributes: ["username"],
        }]
    })
    res.render('homepage',  {
      posts: postData,
      logged_in: req.session.logged_in
    }); 
  });


router.get('/login', async (req,res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).json(error)
    }
})

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