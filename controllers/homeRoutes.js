const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
          model: User,
          attributes: ["username"],
        }]
    })
    res.render('posts',  {
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

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', { 
        logged_in: req.session.logged_in
    })
    } catch (error) {
        res.status(500).json(error)
    }
})

  module.exports = router;