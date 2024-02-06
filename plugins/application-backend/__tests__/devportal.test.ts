import { Client } from 'pg';
import { StartedTestContainer } from 'testcontainers';
import { applyMigrations, applySeed } from './migration/migrate';
import { generatePgContainer } from './setup/containers';
import { devportalClient } from './setup/setups';

jest.setTimeout(20000);
let container: StartedTestContainer;
let client: Client;

beforeAll(async () => {
  container = await generatePgContainer();
  client = await devportalClient(container);
  await applyMigrations(container);
  await applySeed(container);
});

test('test', async () => {
  // devportal backend tests
  const result = await client.query(
    "SELECT * FROM partners WHERE email = 'teste@email.com'",
  );
  expect(result.rows[0].email).toBe('teste@email.com');
  expect(result.rowCount).toBe(3);
});

afterAll(() => {
  client.end();
  container.stop();
});
