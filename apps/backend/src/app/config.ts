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
    env: 'MONGODB_URI',
  },
  referer: {
    tag_limit: {
      doc: 'Maximum number of tags processed from meta',
      format: Number,
      default: 10,
      env: 'REFERER_TAG_LIMIT',
    },
    refresh_seconds: {
      doc: 'Minimum time in seconds before a new scrape is made',
      format: Number,
      default: 60 * 5,
      env: 'REFERER_REFRESH_SECONDS',
    },
  },
});
