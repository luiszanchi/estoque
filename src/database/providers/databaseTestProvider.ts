import { Sequelize } from 'sequelize-typescript';
import { setModels } from './databaseModels';


export const databaseTestProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: () => {
        const sequelize = new Sequelize('sqlite::memory:');
        setModels(sequelize);
        return sequelize.sync();
      },
    },
  ];