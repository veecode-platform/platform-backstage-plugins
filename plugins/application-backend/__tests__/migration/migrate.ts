import knexFactory from 'knex';
import { StartedTestContainer } from 'testcontainers';

export const db = (container: StartedTestContainer) => {
  return knexFactory({
    client: 'pg',
    connection: {
      user: 'test',
      password: 'test',
      database: 'devportal_tests',
      host: container.getHost(),
      port: container.getMappedPort(5432),
    },
  });
};

export async function applyMigrations(container: StartedTestContainer) {
  await db(container).migrate.latest({
    directory: `${__dirname  }./../../migrations`,
  });
}

export async function applySeed(container: StartedTestContainer) {
  await db(container).seed.run({
    directory: `${__dirname  }./../../seeds`,
  });
}
