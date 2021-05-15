import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/utils/sequelize';
import ReportChildComment from './reportChildComment';

interface ChildCommentAttributes {
  id: number;
  content: string;
  commentId?: number;
}

interface ChildCommentCreationAttributes
  extends Optional<ChildCommentAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface ChildCommentInstance
  extends Model<ChildCommentAttributes, ChildCommentCreationAttributes>,
    ChildCommentAttributes {}

const ChildComment = sequelize.define<ChildCommentInstance>('child_comments', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

ChildComment.hasMany(ReportChildComment, {
  onDelete: 'CASCADE',
});

ReportChildComment.belongsTo(ChildComment, {
  onDelete: 'CASCADE',
});

export default ChildComment;
