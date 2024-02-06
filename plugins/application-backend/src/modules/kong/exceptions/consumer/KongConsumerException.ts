import { AxiosError } from 'axios';
import {
  KongBadRequestException,
  KongForbiddenException,
  KongInternalServerException,
  KongNotFoundException,
  KongUnauthorizedException
} from '../KongException';

export class KongConsumerBadRequest extends KongBadRequestException {}
export class KongConsumerForbidden extends KongForbiddenException {}
export class KongConsumerUnauthorized extends KongUnauthorizedException {}
export class KongConsumerNotFound extends KongNotFoundException {}
export class KongConsumerInternalServer extends KongInternalServerException {}

export const kongConsumerExceptions = (error: AxiosError) => {
  const status = error.response?.status;
  const message = error.response?.statusText;
  switch (status) {
    case 400:
      throw new KongConsumerBadRequest(message ?? '', status);
    case 401:
      throw new KongConsumerUnauthorized(message ?? '', status);
    case 403:
      throw new KongConsumerForbidden(message ?? '', status);
    case 404:
      throw new KongConsumerNotFound(message ?? '', status);
    case 500:
      throw new KongConsumerInternalServer(message ?? '', status);
    default:
      throw new AxiosError(message);
  }
};
