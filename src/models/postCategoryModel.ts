import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/sequelize';
import Post from './postModel';

interface PostCategoryAttributes {
  id: number;
  name: string;
}

interface PostCategoryCreationAttributes
  extends Optional<PostCategoryAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface PostCategoryInstance
  extends Model<PostCategoryAttributes, PostCategoryCreationAttributes>,
    PostCategoryAttributes {}

const PostCategory = sequelize.define<PostCategoryInstance>('posts_category', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

PostCategory.hasMany(Post, {
  constraints: false,
});

Post.belongsTo(PostCategory);

export default PostCategory;
