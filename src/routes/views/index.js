import { useRouter } from "#rewind";
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
const router = useRouter();

router.get('/about', (req, res) => {
    res.end('About page');
})
router.get('/', (req, res) => {
    const cookie = crypto.randomUUID().split('-').join('');
    fs.readFile('./src/routes/views/home.html', function(err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': [`rewind.test=${cookie}; HttpOnly`, `rewind.test2=test`]
        });
        res.write(data);
        return res.end();
    });
})

export default router;