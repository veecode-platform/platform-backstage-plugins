import { Buffer } from 'buffer';

export const encodeToBase64 = (content: string): string => {
    const base64Encoded = Buffer.from(content, 'utf-8').toString('base64');
    return base64Encoded;
};