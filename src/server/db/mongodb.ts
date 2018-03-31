import { orderedFor } from "../util/orderedFor";
import { MongoClient } from "mongodb";
import { BatchLoadFn } from "dataloader";

export interface ILittleJohnMongoClient {
  getLotsForUserIds: BatchLoadFn<Array<string>, Array<Object>>;
}

export const mongodb: Function = (mongoPool: MongoClient): ILittleJohnMongoClient => ({
  getLotsForUserIds(userIds: Array<string>): Array<Object> {
    return mongoPool
      .collection("lots")
      .find({ ownerId: { $in: userIds } })
      .toArray()
      .then((rows: Object) => orderedFor(rows, userIds, "ownerId", false));
  },
});
