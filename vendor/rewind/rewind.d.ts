import http, { IncomingMessage, ServerResponse } from 'http';

export type RequestHandler = (
    path: URL | string,
    cb: (
        req: IncomingMessage, 
        res: ServerResponse, 
        next: (req: IncomingMessage, res: ServerResponse) => void,
    ) => void,
) => void;
