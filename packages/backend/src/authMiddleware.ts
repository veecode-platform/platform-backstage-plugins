import type { Config } from '@backstage/config';
import { getBearerTokenFromAuthorizationHeader } from '@backstage/plugin-auth-node';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { decodeJwt } from 'jose';
import { URL } from 'url';
import { PluginEnvironment } from './types';

function setTokenCookie(
  res: Response,
  options: { token: string; secure: boolean; cookieDomain: string },
) {
  try {
    const payload = decodeJwt(options.token);
    res.cookie('token', options.token, {
      expires: new Date(payload.exp ? payload.exp * 1000 : 0),
      secure: options.secure,
      sameSite: 'lax',
      domain: options.cookieDomain,
      path: '/',
      httpOnly: true,
    });
  } catch (_err) {
    // Ignore
  }
}

export const createAuthMiddleware = async (
  config: Config,
  appEnv: PluginEnvironment,
) => {
  const baseUrl = config.getString('backend.baseUrl');
  const secure = baseUrl.startsWith('https://');
  const cookieDomain = new URL(baseUrl).hostname;
  const authMiddleware: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {   
      const token = getBearerTokenFromAuthorizationHeader(req.headers.authorization) || (req.cookies?.token as string | undefined);
      const skipHeader = (req.headers["x-authorization-identity"] as string | undefined)

      if (!token) {
        res.status(401).send('Unauthorized');
        return;
      }
      try {
        if(skipHeader) req.headers.authorization = `Bearer ${skipHeader}` //
        req.user = await appEnv.identity.getIdentity({ request: req });
      } catch {
        await appEnv.tokenManager.authenticate(token);
      }
      if (!req.headers.authorization) {
        // Authorization header may be forwarded by plugin requests
        req.headers.authorization = `Bearer ${token}`;
      }
      if (token && token !== req.cookies?.token) {
        setTokenCookie(res, {
          token,
          secure,
          cookieDomain,
        });
      }
      if(skipHeader) req.headers.authorization = `Bearer ${token}`;
      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  };
  return authMiddleware;
};
