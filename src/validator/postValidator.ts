const { check } = require('express-validator');
const LikePost = require('../models/likePostModel');

exports.likePostValidator = [
  check('userId').custom((value: string) => {
    return LikePost.findOne({ where: { userId: value } }).then(
      (like: typeof LikePost) => {
        if (like) {
          return Promise.reject('Post already liked');
        }
      },
    );
  }),
];
