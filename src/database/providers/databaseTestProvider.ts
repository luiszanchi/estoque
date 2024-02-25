import { Sequelize } from 'sequelize-typescript';
import { setModels } from './databaseModels';


export const databaseTestProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize('sqlite::memory:');
        setModels(sequelize);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];