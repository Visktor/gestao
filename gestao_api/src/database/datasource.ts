import { DataSource } from "typeorm";
import { join } from 'path'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "172.17.0.2",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [join(__dirname, "./entities/*")],
  subscribers: [],
  migrations: [join(__dirname, "./migrations/*{.ts,.js}")],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successfully initialized.");
  })
  .catch((err) =>
    console.log(`Error during database connection initialization. ${err}`),
  );
