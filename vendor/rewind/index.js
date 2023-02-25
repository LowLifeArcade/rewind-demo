import http, { IncomingMessage, ServerResponse } from 'http';
/** @typedef { import('./rewind').RequestHandler } RequestHandler */

function useRequest(method, { path, cb, app }) {
    app.server.on('request', handleRequest);
    
    /**
     * @param { IncomingMessage } req
     * @param { ServerResponse } res
     */
    function handleRequest(req, res) {
        iLog("handleRequest", {
            path,
            reqUrl: req.url,
            reqMethod: req.method,
            method,
        })
        if (req.method !== method || req.url !== path) {
            eLog(`${method} request logged for ${req.url}`)
            method === 'GET' && res.end(`No ${method} access`);
            // method === 'POST'&& res.statusCode(404);
            return;
        }
        iLog(`${method} request logged for ${req.url}`);
        cb(req, res)
    }
}

function rewind(opts = { }) {
    let { base = '/' } = opts;

    return {
        server: http.createServer(), 
        listen(params) {
            this.server.listen(params);
        },
        use(_module = null) {
            iLog('use: ', _module.routes);
            if (_module.type === 'routes') {
                const routes = _module.routes;
                for (let i = 0; i < routes.length; i++) {
                    const route = routes[i];
                    this[route[0].toLowerCase()](route[1], route[2])
                }
            }
        },
        /** @type { RequestHandler } */
        get(path, cb) {
            useRequest('GET', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
            });
        },
        /** @type { RequestHandler } */
        post(path, cb) {
            useRequest('POST', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
            });
        },
        /** @type { RequestHandler } */
        put(path, cb) {
            useRequest('PUT', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
            });
        },
        /** @type { RequestHandler } */
        delete(path, cb) {
            useRequest('DELETE', {
                path: clean({ base }) + clean({ path }),
                cb,
                app: this,
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
        get(path, cb) {
            this.routes.push(['GET', this.basePath + clean({ path }), cb])
        },
        /** @type { RequestHandler } */
        post(path, cb) {
            this.routes.push(['POST', this.basePath + clean({ path }), cb])
        },
        /** @type { RequestHandler } */
        put(path, cb) {
            this.routes.push(['PUT', this.basePath + clean({ path }), cb])
        },
        /** @type { RequestHandler } */
        delete(path, cb) {
            this.routes.push(['DELETE', this.basePath + clean({ path }), cb])
        },
        routes: [],
    }
}

export function iLog(...val) {
    console.info('info:', ...val);
    // TODO: log to service
}
export function eLog(...val) {
    console.error('ERROR:', ...val);
    // TODO: log to service
}

export default rewind;
