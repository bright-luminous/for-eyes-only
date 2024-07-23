import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      // const dataSource = new DataSource({
      //   type: 'sqlite',
      //   database: 'localEntries',
      //   entities: [
      //       __dirname + '/../**/*.entity{.ts,.js}',
      //   ],
      //   synchronize: true,
      // });

      const dataSource = new DataSource({
        type: 'mssql',
        host: 'foreyesonly.database.windows.net',
        port: 1433,
        username: 'FEOuser',
        password: 'Eauu0244!',
        database: 'FEO-database',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];