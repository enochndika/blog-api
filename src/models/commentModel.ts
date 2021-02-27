import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/sequelize';
import ChildComment from './childCommentModel';
import ReportComment from './reportComment';

interface CommentAttributes {
  id: number;
  content: string;
  like: number;
  postId?: number;
}
interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface CommentInstance
  extends Model<CommentAttributes, CommentCreationAttributes>,
    CommentAttributes {}

const Comment = sequelize.define<CommentInstance>('comments', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

Comment.hasMany(ChildComment, {
  onDelete: 'CASCADE',
});

ChildComment.belongsTo(Comment, {
  constraints: false,
});

Comment.hasMany(ReportComment, {
  onDelete: 'CASCADE',
});

ReportComment.belongsTo(Comment, {
  constraints: false,
});

export default Comment;
