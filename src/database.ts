import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ass-8',
  password: 'dipali123',
  port: 5432,
});
