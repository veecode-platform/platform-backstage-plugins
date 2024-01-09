import { StartedTestContainer } from 'testcontainers';
import { generateKongContainer } from './setup/containers';

jest.setTimeout(20000);
let container: StartedTestContainer;

beforeAll(async () => {
  container = await generateKongContainer();
});

test('test', async () => {
  // kong backend tests
});

afterAll(() => {
  container.stop();
});
