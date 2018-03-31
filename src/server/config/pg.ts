import { PoolConfig } from "pg";

const port: number = parseInt(process.env.PGPORT, 10) || 0;

export const development: PoolConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port,
  database: "watchlists",
};
