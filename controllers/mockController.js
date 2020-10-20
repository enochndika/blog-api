const User = require("../models/userModel");
const Post = require("../models/postModel");
const PostCategory = require("../models/postCategoryModel");
const ChildComment = require("../models/childCommentModel");
const Comment = require("../models/commentModel");
const LikePost = require("../models/likePostModel");
const faker = require("faker");
const slugify = require("slugify");
const pictures = require("../utils/pics");
const avatars = require("../utils/avatars");

exports.createUser = async (req, res) => {
  const randomAvatar = Math.floor(Math.random() * avatars.length);
  const data = avatars[randomAvatar];
  try {
    const user = new User({
      username: faker.name.firstName().toLowerCase(),
      fullName: faker.name.firstName() + " " + faker.name.lastName(),
      password: "secret",
      avatar: [data],
      //   role: "king",
    });
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.createPost = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * pictures.length);
  const data = pictures[randomNumber];
  try {
    const post = new Post({
      title: faker.commerce.productName(),
      local: faker.lorem.paragraphs(7),
      description: faker.lorem.paragraph(),
      userId: faker.finance.amount(1, 50, 0),
      postsCategoryId: faker.finance.amount(1, 6, 0),
      image: [data],
      read_time: faker.finance.amount(1, 8, 0),
      vip: false,
      promoted: false,
    });
    post.slug = slugify(post.title.toLowerCase());
    await post.save();
    res.json(post);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      content: faker.lorem.paragraph(),
      userId: faker.finance.amount(1, 45, 0),
      postId: req.params.id,
    });
    await comment.save();
    res.json(comment);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.createPostCategory = async (req, res) => {
  try {
    const postCategory = new PostCategory({
      name: faker.commerce.productName(),
    });
    await postCategory.save();
    res.json(postCategory);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.createChildComments = async (req, res) => {
  try {
    const childComments = new ChildComment({
      commentId: 101,
      content: faker.lorem.words(),
      userId: req.params.userId,
    });
    await childComments.save();
    res.json(childComments);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.likePosts = async (req, res) => {
  try {
    const like = new LikePost({
      postId: 35,
      userId: req.params.userId,
    });
    await like.save();
    const post = await Post.findOne({ where: { id: like.postId } });
    post.like = post.like + 1;
    await post.save();
    res.json(like);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
