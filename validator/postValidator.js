const { check } = require("express-validator");
const LikePost = require("../models/likePostModel");

exports.likePostValidator = [
  check("userId").custom((value) => {
    return LikePost.findOne({ where: { userId: value } }).then((user) => {
      if (user) {
        return Promise.reject("Post already liked");
      }
    });
  }),
];
