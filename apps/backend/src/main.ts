import { app } from './app';
import { connectDB } from './app/infrastructure/connect-db';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

app.set('host', host);
// app.set('port', port);

try {
  app
    .listen(port, async () => {
      await connectDB();
    })
    .on('error', console.error);
} catch (e) {
  console.error(e);
}
