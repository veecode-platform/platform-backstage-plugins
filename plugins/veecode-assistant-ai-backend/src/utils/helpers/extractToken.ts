export function extractToken(header:string):string{
    
    const headerObj = JSON.parse(header);
    const authorizationHeader = headerObj.headers?.Authorization;
  
    if (!authorizationHeader) {
      throw new TypeError('Missing Authorization header');
    }
  
    const token = authorizationHeader.match(/^Bearer\s(\S+)$/i)?.[1]; 
  
    if (!token) {
      throw new TypeError('Expected Bearer token');
    }
    
    return token;
}