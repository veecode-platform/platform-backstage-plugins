import { AxiosError } from 'axios';
import {
  KongBadRequestException,
  KongForbiddenException,
  KongInternalServerException,
  KongNotFoundException,
  KongUnauthorizedException
} from '../KongException';

export class KongConsumerGroupBadRequest extends KongBadRequestException {}
export class KongConsumerGroupForbidden extends KongForbiddenException {}
export class KongConsumerGroupUnauthorized extends KongUnauthorizedException {}
export class KongConsumerGroupNotFound extends KongNotFoundException {}
export class KongConsumerGroupInternalServer extends KongInternalServerException {}

export const kongConsumerGroupExceptions = (error: AxiosError) => {
  const status = error.response?.status;
  const message = error.response?.statusText;
  switch (status) {
    case 400:
      throw new KongConsumerGroupBadRequest(message ?? '', status);
    case 401:
      throw new KongConsumerGroupUnauthorized(message ?? '', status);
    case 403:
      throw new KongConsumerGroupForbidden(message ?? '', status);
    case 404:
      throw new KongConsumerGroupNotFound(message ?? '', status);
    case 500:
      throw new KongConsumerGroupInternalServer(message ?? '', status);
    default:
      throw new AxiosError(message);
  }
};
