import { DataSourceOptions } from 'typeorm';

export const connectionOptions = async (
  env: NodeJS.ProcessEnv,
): Promise<DataSourceOptions> => ({
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT) || 3306,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
});
