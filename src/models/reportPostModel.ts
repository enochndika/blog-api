import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

interface ReportPostAttributes {
  id: number;
  subject: string;
}
interface ReportPostCreationAttributes
  extends Optional<ReportPostAttributes, 'id'> {}

interface ReportPostInstance
  extends Model<ReportPostAttributes, ReportPostCreationAttributes>,
    ReportPostAttributes {}

const ReportPost = sequelize.define<ReportPostInstance>('reports_posts', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  subject: {
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

export default ReportPost;
