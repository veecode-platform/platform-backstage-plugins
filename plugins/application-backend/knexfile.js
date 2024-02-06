module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      database: 'backstage_plugin_application',
      password: 'postgres',
    },
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host:  process.env.DB_HOST,
      user: process.env.DB_USER,
      database: 'platform_devportal ',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './migrations',
    },
  }
}
