import { Environment } from 'testcontainers/dist/docker/types';

export const env: Environment = {
  POSTGRES_USER: 'test',
  POSTGRES_PASSWORD: 'test',
  POSTGRES_DB: 'devportal_tests',
};
