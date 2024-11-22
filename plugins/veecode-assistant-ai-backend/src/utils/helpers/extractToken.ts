import { JsonValue } from '@backstage/types';

export function extractToken(header:string):string{

    const token = header.match(/^Bearer\s(\S+\.\S+\.\S+)$/i)?.[1];

    if (!token) {
      throw new TypeError('Expected Bearer with JWT');
    }

    const [_header, rawPayload, _signature] = token.split('.');
    const payload: JsonValue = JSON.parse(
      Buffer.from(rawPayload, 'base64').toString(),
    );

    if (
      typeof payload !== 'object' ||
      payload === null ||
      Array.isArray(payload)
    ) {
      throw new TypeError('Malformed JWT payload');
    }

    return token
}