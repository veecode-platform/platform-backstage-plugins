export class KongException extends Error {
  status: number;
  timestamp: string;

  constructor(message: string, status: number) {
    super(`kong-consumer: ${message}`);
    this.status = status;
    this.timestamp = new Date().toISOString();
  }
}

export class KongBadRequestException extends KongException {}
export class KongUnauthorizedException extends KongException {}
export class KongForbiddenException extends KongException {}
export class KongNotFoundException extends KongException {}
export class KongInternalServerException extends KongException {}
