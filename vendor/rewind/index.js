import http from 'http';
import fs from 'fs';
import path from 'path';
/** @typedef { import('./rewind').RequestHandler } RequestHandler */
/** @typedef { import('./rewind').KeywallRequest } KeywallRequest */
/** @typedef { import('./rewind').KeywallResponse } KeywallResponse */

/**
 * @param { KeywallRequest } req
 * @param { KeywallResponse } res
 */
function onRequest(req, res) {
    let [ reqUrl, query ] = req.url.split('?');
    req.url = reqUrl = clean({ base: reqUrl });
    req.query = query;
    const reqMethod = req.method;

    log('request', {
        reqUrl,
        query,
        reqMethod,
        // req,
        // res
    })
    
    for (let i = 0; i < this.routes.length; i++) {
        const [ method, path, cb, next ] = this.routes[i];
        
        if (method === req.method && path === reqUrl) {
            log('success', 'handle request cb',`${method} request logged for ${reqUrl}\n`);
            return cb(req, res);
        }
    }
    this.handleError(req, res);
}

function rewind(opts = { }) {
    let { base = '/' } = opts;
    const { server } = setUp(); 

    function setUp() {
        console.clear();
        const server = http.createServer();
        return { server };
    }
    
    return {
        server,
        listen(port, listenCb) {
            this.server.listen(port);
            this.server.on('request', (req, res) => {
                this.onRequest(req, res);
            }); 
            listenCb(this.server); 
        },
        routes: [],
        onRequest,
        /**
         * @param { KeywallRequest } req
         * @param { KeywallResponse } res
         */
        handleError(req, res) {
            res.writeHead(404, {
                'Content-Type': 'text/plain',
            })
            res.end('404')
        },
        use(_module = null) {
            log('use: ', _module.routes);
            if (_module.type === 'routes') {
                const routes = _module.routes;

                for (let i = 0; i < routes.length; i++) {
                    const [ method, path, cb, next ] = routes[i];
                    this[method.toLowerCase()](path, cb, next)
                } 
            }
        },
        /** @type { RequestHandler } */
        get(path, cb, ...next) {
            this.addRoute('GET', { path, cb, next });
        },
        /** @type { RequestHandler } */
        post(path, cb, ...next) {
            this.addRoute('POST', { path, cb, next });
        },
        /** @type { RequestHandler } */
        put(path, cb, ...next) {
            this.addRoute('PUT', { path, cb, next });
        },
        /** @type { RequestHandler } */
        delete(path, cb, ...next) {
            this.addRoute('DELETE', { path, cb, next });
        },
        addRoute(method, opts) {
            this.routes.push([method, clean({ base }) + clean({ path: opts.path }), opts.cb, opts?.next]);
        },
        onNext(req, res, next) {
            if (!next) {
                // handleRequest or useRequest?
            }
        
            for (let i = 0; i < next.length; i++) {
                const nextCb = next[i];
                nextCb(req, res);
            }
        }
    };
}


function clean({ base, path }) {
    let url = base || path;

    if (path && !url.endsWith('/')) {
        url = url + '/';
    }
    if (path && url.startsWith('/')) {
        url = url.slice(1);
    }
    if (base && !url.endsWith('/')) {
        url = url + '/';
    }
    if (base && !url.startsWith('/')) {
        url = '/' + url;
    }

    return url;
}

export function useRouter() {
    return {
        type: 'routes',
        basePath: '',
        base(base) {
            this.basePath = clean({ base });
        },
        addRoute(method, opts) {
            this.routes.push([ method, this.basePath + clean({ path: opts.path }), opts.cb, opts.next ])
        },
        /** @type { RequestHandler } */
        get(path, cb, next) {
            this.addRoute('GET', { path, cb, next });
        },
        /** @type { RequestHandler } */
        post(path, cb, next) {
            this.addRoute('POST', { path, cb, next });
        },
        /** @type { RequestHandler } */
        put(path, cb, next) {
            this.addRoute('PUT', { path, cb, next });
        },
        /** @type { RequestHandler } */
        delete(path, cb, next) {
            this.addRoute('DELETE', { path, cb, next });
        },
        routes: [],
    }
}

/**
 * @param {'info' | 'error' | 'request' | 'success' } type 
 * @param  { ...any } val 
 */
export function log(type, ...val) {
    let opts = type;
    let logType = type;
    
    if (typeof logType !== 'string') {
        logType = opts.type;
    }
    
    switch (logType) {
        case 'info':
            console.info(`${logType}:`, ...val);
            break;
        case 'request':
            console.info(`${logType}:`, ...val); 
            break;
        case 'error':
            console.error(`${logType}:`, ...val);
            break;
        case 'success':
            console.log(`${logType}:`, ...val);
            break;
        default:
            break;
    }
    // TODO: log to service
}

export default rewind;
