import { AxiosError } from 'axios';

export class ErrorModel extends AxiosError {
  constructor() {
    super();
  }
}
