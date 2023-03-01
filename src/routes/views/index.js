import { useRouter } from "#rewind";
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require('../../../package.json');
const router = useRouter();

router.get('/about', async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(/* HTML */`
        <h1>About</h1>
        <section>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quisquam totam eum voluptates pariatur illo quae iusto dolore delectus nesciunt deleniti facere ipsa asperiores labore exercitationem molestias inventore numquam, enim dolor. At hic numquam quas a quae harum natus sunt odit? Reprehenderit facilis non cum, laborum corporis autem aliquid nihil!
        </section>
        <style>
            section {
                background-color: salmon;
            }
        </style>
    `)
    res.end();
});

router.get('/version', async (req, res) => {
    const query = new URLSearchParams(req.query);
    
    if (query.get('key') === (process.env.KEY || 'hi-mom')) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        })
        res.write(JSON.stringify({
            version: pkg.version,
            name: pkg.name,
            description: pkg.description,
        }, null, 2))
        res.end()
    } else {
        res.writeHead(401, {
            'content-type': 'text/plain'
        })
        res.end('access denied')
    }
})

router.get('/', async (req, res) => {
    fs.readFile('./src/routes/views/home.html', function(err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.write(data);
        return res.end();
    });
})

export default router;