import { useRouter } from "#rewind";
import crypto from 'crypto';
const router = useRouter();

router.get('/about', (req, res) => {
    res.end('About page');
})
router.get('/', (req, res) => {
    const cookie = crypto.randomUUID().split('-').join('');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'x-test': 'test',
        'Set-Cookie': [`rewind.test=${cookie}; HttpOnly`, `rewind.test2=test`],
    });
    res.end(`Home page`);
})

export default router;