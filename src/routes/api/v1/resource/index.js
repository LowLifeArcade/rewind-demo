import { useRouter, log } from "#rewind";
import { readFile } from 'fs/promises';
import crypto from 'crypto';
import { getDirName } from "../../../../utils/dirname.js";

const router = useRouter();
router.base('api/v1/resource/');

router.get('/images/keywall', async (req, res) => {
    res.writeHead(200, {
        "Content-Type": 'image/jpg'
    })
    res.end('keywall image');
});

router.get('/home.js', async (req, res) => {
    const js = await readFile('./hidden-src/pages/home.min.js', 'utf8');
    res.writeHead(200, {
        'Content-Type': 'text/javascript'
    })
    res.end(js)
})

router.get('/', async (req, res) => {
    const cookie = crypto.randomUUID().split('-').join('');
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': [`rewind.keywall=${cookie}; HttpOnly`],
    });
    res.write(JSON.stringify({
        'msg': `Hello from server resources ${req.url}!`
    }))
    res.end();
})

export default router;