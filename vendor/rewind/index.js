import http, { IncomingMessage, ServerResponse, Server } from 'http';
/** @typedef { import('./rewind').RequestHandler } RequestHandler */

function handleNext(req, res, next) {
    if (!next) {
        // handleRequest or useRequest?
    }

    for (let i = 0; i < next.length; i++) {
        const nextCb = next[i];
        nextCb(req, res);
    }
}

function useRequest(method, { path, cb, app, next }) {
    /**@type { Server } */

    app.server.on('request', handleRequest);
    
    /**
     * @param { IncomingMessage } req
     * @param { ServerResponse } res
     */
    function handleRequest(req, res) {
        const reqUrl = clean({ path: req.url });
        
        log('request', {
            path,
            reqUrl,
            reqMethod: req.method,
            method,
            // req,
            // res
        })

        try {
            if (req.method !== method || reqUrl !== path) {
                log('error', `${method} request logged for ${reqUrl}\n`)
                return;
            }
    
            log('success', 'handle request cb',`${method} request logged for ${reqUrl}\n`);
            cb(req, res);
        } catch (error) {
            log('error', error);
        }
    }
}

function rewind(opts = { }) {
    let { base = '/' } = opts;
    return {
        server: http.createServer(), 
        listen(port, cb) {
            this.server.listen(port);
            cb(this.server);
        },
        use(_module = null) {
            log('use: ', _module.routes);
            if (_module.type === 'routes') {
                const routes = _module.routes;
                for (let i = 0; i < routes.length; i++) {
                    const route = routes[i];
                    this[route[0].toLowerCase()](route[1], route[2])
                }
            }
        },
        /** @type { RequestHandler } */
        get(path, cb, ...next) {
            useRequest('GET', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
                next,
            });
        },
        /** @type { RequestHandler } */
        post(path, cb, ...next) {
            useRequest('POST', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
                next,
            });
        },
        /** @type { RequestHandler } */
        put(path, cb, ...next) {
            useRequest('PUT', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
                next,
            });
        },
        /** @type { RequestHandler } */
        delete(path, cb, ...next) {
            useRequest('DELETE', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
                next,
            });
        }
    };
}

function clean({ base = null, path = null }) {
    if (path && !path.endsWith('/')) {
        path = path + '/';
    }
    if (path && path.startsWith('/')) {
        path = path.slice(1);
    }
    if (base && !base.endsWith('/')) {
        base = base + '/';
    }
    if (base && !base.startsWith('/')) {
        base = '/' + base;
    }

    return base || path;
}

export function useRouter() {
    return {
        type: 'routes',
        basePath: '',
        base(base) {
            this.basePath = clean({ base });
        },
        /** @type { RequestHandler } */
        get(path, cb, next) {
            this.routes.push(['GET', this.basePath + clean({ path }), cb, next])
        },
        /** @type { RequestHandler } */
        post(path, cb, next) {
            this.routes.push(['POST', this.basePath + clean({ path }), cb, next])
        },
        /** @type { RequestHandler } */
        put(path, cb, next) {
            this.routes.push(['PUT', this.basePath + clean({ path }), cb, next])
        },
        /** @type { RequestHandler } */
        delete(path, cb, next) {
            this.routes.push(['DELETE', this.basePath + clean({ path }), cb, next])
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
