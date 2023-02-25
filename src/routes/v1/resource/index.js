import { useRouter } from "#rewind";
import crypto from 'crypto';
const router = useRouter();

router.base('/v1/resource/')

router.get('/test', (req, res) => {
    res.end('test resource route')
})
router.get('/', (req, res) => {
    console.log('handleRequest | req:', req.method);
    const cookie = crypto.randomUUID().split('-').join('');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'x-test': 'test',
        'Set-Cookie': [`rewind.test=${cookie}; HttpOnly`, `rewind.test2=test`],
    });

    res.end(`Hello from server ${req.url}!`);
})

export default router;