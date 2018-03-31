export interface IPostgresConfig {
  user: string;
  host: string;
  password: string;
  port: string;
  database: string;
}

export const development: IPostgresConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: "watchlists",
};
