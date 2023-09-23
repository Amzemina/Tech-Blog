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

  module.exports = router;