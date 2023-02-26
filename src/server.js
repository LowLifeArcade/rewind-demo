import rewind, { log } from '#rewind';
import resourceRoutes from './routes/api/v1/resource/index.js';
import viewRoutes from './routes/views/index.js';

const port = process.env.port || 8080;
const app = rewind();

app.use(resourceRoutes);
app.use(viewRoutes);

app.listen(port, (server) => {
    log('info', `Http server listening on http://localhost:${ port }`);
});
