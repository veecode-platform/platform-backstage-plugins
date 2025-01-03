export function extractToken(header:string):string{
  
  const token = header.match(/^Bearer\s(\S+)$/i)?.[1];
  
    if (!token) {
      throw new TypeError('Expected Bearer token');
    }
    
    return token;
}
