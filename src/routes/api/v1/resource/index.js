import { useRouter } from "#rewind";
import crypto from 'crypto';
const router = useRouter();

router.base('api/v1/resource/')

router.get('/images/keywall', (req, res) => {
    res.end('keywall image');
})
router.get('/', (req, res) => {
    const cookie = crypto.randomUUID().split('-').join('');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'x-test': 'test',
        'Set-Cookie': [`rewind.test=${cookie}; HttpOnly`, `rewind.test2=test`],
    });

    res.end(`Hello from server resources ${req.url}!`);
})

export default router;