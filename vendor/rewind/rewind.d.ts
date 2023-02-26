import http, { IncomingMessage, ServerResponse } from 'http';

export interface KeywallRequest extends IncomingMessage {
    query: string,
}

export interface KeywallResponse extends ServerResponse {
    
}

export type RequestHandler = (
    path: URL | string,
    cb: (
        req: KeywallRequest, 
        res: KeywallResponse, 
        next: (req: KeywallRequest, res: KeywallResponse) => void,
    ) => void,
) => void;
