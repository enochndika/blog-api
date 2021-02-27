import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '@/utils/sequelize';

/* This model will allows to incrementally adding new page for paginating post list on client-side everytime the total
page count of posts change. This is required if the client is using Next.js with getStaticProps and getStaticPaths*/

interface IncrementPageAttributes {
  id: number;
  page: string;
}
interface IncrementPageCreationAttributes
  extends Optional<IncrementPageAttributes, 'id'> {}

interface IncrementPageInstance
  extends Model<IncrementPageAttributes, IncrementPageCreationAttributes>,
    IncrementPageAttributes {}

const IncrementPage = sequelize.define<IncrementPageInstance>('static_page', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  page: {
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

export default IncrementPage;
