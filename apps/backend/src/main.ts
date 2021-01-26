import { app } from './app';
import { connectDB } from './app/infrastructure/connect-db';
import { config } from './app/config';

const host = config.get('host');
const port = config.get('port');

app.set('host', host);

try {
  app
    .listen(port, async () => {
      await connectDB();
    })
    .on('error', console.error);
} catch (e) {
  console.error(e);
}
