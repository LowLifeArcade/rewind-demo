import { useRouter } from "#rewind";
const router = useRouter();

router.base('/v1/resource/')

router.get('/test', (req, res) => {
    res.end('test resource route')
})
router.post('/', (req, res) => {
    console.log("router.post | req:", req)
    res.end('done')
})

export default router;