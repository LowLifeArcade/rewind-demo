import rewind, { log } from '#rewind';
import resourceRoutes from './src/routes/api/v1/resource/index.js';
import viewRoutes from './src/routes/views/index.js';

const port = process.env.PORT || 8080;
const app = rewind();

app.use(resourceRoutes);
app.use(viewRoutes);
app.cors(['*']);

app.listen(port, (server) => {
    log('info', `Http server listening on http://localhost:${ port }`, app.config.origins);
});
