import * as convict from 'convict';
import * as dotenv from 'dotenv';

dotenv.config();

export const config = convict({
  env: {
    env: 'NODE_ENV',
    format: ['development', 'production'],
    default: 'development',
    doc: 'Node environment',
  },
  host: {
    env: 'HOST',
    format: 'ipaddress',
    default: '0.0.0.0',
  },
  port: {
    env: 'PORT',
    format: 'port',
    default: 3000,
  },
  url: {
    env: 'URL',
    format: 'url',
    default: 'http://0.0.0.0:3000',
  },
  admin_key: {
    doc: 'Admin URL path',
    default: 'mw5RbBZZuNcgXNY',
    env: 'ADMIN_KEY',
  },
  db_uri: {
    doc: 'Database URI',
    format: String,
    default: 'mongodb://localhost/vellum',
  },
});
