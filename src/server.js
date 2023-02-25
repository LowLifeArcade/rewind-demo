import rewind, { iLog } from '#rewind';
import crypto from 'crypto'; 
import resourceRoutes from './routes/v1/resource/index.js'

const port = process.env.port || 8080;

const app = rewind({
    base: 'api'
});

app.use(resourceRoutes);

// app.get('/', (req, res) => { 
//     console.log('handleRequest | req:', req.method);
//     const cookie = crypto.randomUUID().split('-').join('');
//     res.writeHead(200, {
//         'Content-Type': 'text/plain',
//         'x-test': 'test',
//         'Set-Cookie': [`rewind.test=${cookie}; HttpOnly`, `rewind.test2=test`],
//     });

//     res.end(`Hello from server ${req.url}!`);
// })

app.listen(port, () => {
    iLog(`Http server listening on http://localhost:${port}`);
});
