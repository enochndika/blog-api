import faker from 'faker';
import slugify from 'slugify';
import { Response, Request } from 'express';

import avatars from '@/utils/avatars';
import User from '@/models/userModel';
import Post from '@/models/postModel';
import pictures from '@/utils/pictures';
import Comment from '@/models/commentModel';
import LikePost from '@/models/likePostModel';
import PostCategory from '@/models/postCategoryModel';
import ChildComment from '@/models/childCommentModel';

/* This controller allows to create fake data for dev environnement with faker.js*/

async function createUser(req: Request, res: Response) {
  const randomAvatar = Math.floor(Math.random() * avatars.length);
  const data = avatars[randomAvatar];
  try {
    const user = new User({
      username: faker.name.firstName().toLowerCase(),
      fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
      password: 'secret',
      avatar: [data],
      //   role: "king",
    });
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
}

async function createPost(req: Request, res: Response) {
  const randomNumber = Math.floor(Math.random() * pictures.length);
  const data = pictures[randomNumber];
  try {
    const post: any = new Post({
      title: faker.commerce.productName(),
      local: faker.lorem.paragraphs(7),
      description: faker.lorem.paragraph(),
      userId: faker.finance.amount(1, 44, 0),
      postsCategoryId: faker.finance.amount(1, 4, 0),
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
}

async function createComment(req: Request, res: Response) {
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
}

async function createPostCategory(req: Request, res: Response) {
  try {
    const postCategory = new PostCategory({
      name: faker.commerce.productName(),
    });
    await postCategory.save();
    res.json(postCategory);
  } catch (e) {
    res.status(400).json(e);
  }
}

async function createChildComments(req: Request, res: Response) {
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
}

async function createLikes(req: Request, res: Response) {
  try {
    const like: any = new LikePost({
      postId: 35,
      userId: req.params.userId,
    });
    await like.save();
    const post: any = await Post.findOne({ where: { id: like.postId } });
    post.like = post.like + 1;
    await post.save();
    res.json(like);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export {
  createChildComments,
  createComment,
  createLikes,
  createPost,
  createUser,
  createPostCategory,
};
