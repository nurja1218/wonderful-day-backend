import { config } from 'dotenv';

config();

export const isNodeEnv = (type: 'local' | 'dev' | 'prod') =>
  process.env.NODE_ENV === type;
