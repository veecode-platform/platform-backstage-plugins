import { Client } from 'pg';
import { StartedTestContainer } from 'testcontainers/dist/test-container';

export async function devportalClient(
  container: StartedTestContainer,
): Promise<Client> {
  const client = new Client({
    user: 'test',
    password: 'test',
    database: 'devportal_tests',
    host: container.getHost(),
    port: container.getMappedPort(5432),
  });

  await client.connect();
  return client;
}
