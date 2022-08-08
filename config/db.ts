import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: process.env.db_type,
  host: process.env.db_host,
  port: Number(process.env.db_port),
  database: process.env.db_name,
  username: process.env.db_username,
  password: process.env.db_password,
};
