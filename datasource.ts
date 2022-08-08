import { DataSource } from 'typeorm';
import db from './config/db';

const source = new DataSource({
  type: 'postgres',
  port: db.port,
  host: '0.0.0.0',
  database: db.database,
  username: db.username,
  password: db.password,
  entities: [__dirname + '/**/*.entity{.js, .ts}'],
  migrations: ['dist/src/migrations/**/*.js'],
});

export default source;
