import { Client } from 'pg';

const client = new Client({
  user: 'gen_user',
  host: '92.255.77.182',
  database: 'default_db',
  password: '19Boris74',
  port: 5432,
});

client.connect();

export default client;
