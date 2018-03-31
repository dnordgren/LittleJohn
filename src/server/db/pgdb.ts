import { orderedFor } from "../util/orderedFor";
import { PoolConfig, Pool, QueryResult, Query } from "pg";
import { BatchLoadFn } from "dataloader";

export interface ILittleJohnPgClient {
  getUsersByUserIds: BatchLoadFn<Array<string>, Object>;
  getUsersByApiKeys: BatchLoadFn<Array<string>, Object>;
  getWatchlistsForUserIds: BatchLoadFn<Array<string>, Object>;
}

export const pgdb: Function = (pgPool: Pool): ILittleJohnPgClient => ({
  getUsersByUserIds(userIds: Array<string>): Object {
    return pgPool
      .query(
        `
          SELECT * FROM users
          WHERE id = ANY($1)
        `,
        [userIds]
      )
      .then((res: QueryResult) => orderedFor(res.rows, userIds, "id", true));
  },
  getUsersByApiKeys(apiKeys: Array<string>): Object {
    return pgPool
      .query(
        `
          SELECT * FROM users
          WHERE api_key = ANY($1)
        `,
        [apiKeys]
      )
      .then((res: QueryResult) => orderedFor(res.rows, apiKeys, "apiKey", true));
  },
  getWatchlistsForUserIds(userIds: Array<string>): Promise<QueryResult> {
    return pgPool
      .query(
        `
          SELECT * FROM lists
          WHERE owner_id = ANY($1)
        `,
        [userIds]
      )
      .then((res: QueryResult) => orderedFor(res.rows, userIds, "ownerId", false));
  },
});
