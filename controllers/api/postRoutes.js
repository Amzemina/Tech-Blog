const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth')


//Create New post
router.post('/create', withAuth, async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({message: "Missing required field in request"})
      }
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    })
    return res.redirect('/dashboard');
  } catch (error) {
    return res.status(500).send(error)
  }
});

//Update post
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({message: "Missing required field in request"})
    }
    const updatePost = await Post.findByPk(req.params.id, {
        where: {
          user_id: req.session.user_id,
        },
      });
    if (!updatePost) {
      return res.status(400).json({message: "Invalid post id"})
    } else {
      updatePost.date = new Date()
      updatePost.title = req.body.title
      updatePost.content = req.body.content
      await updatePost.save();
      return res.status(200).send()
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error)
  }
})

//Delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postId = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postId) {
      return res.status(404).json({ message: 'No Post found with this id!' });
    }
    return res.status(200).json(postId);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;