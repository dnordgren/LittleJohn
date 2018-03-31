import * as humps from "humps";
import * as _ from "lodash";

export const orderedFor: Function = (
  rows: Object,
  collection: Array<string>,
  field: string,
  isSingleObject: boolean,
): Object | Array<Object> => {
  const normalizedRows: Object = humps.camelizeKeys(rows);

  // build a dictionary of field : values of field from each row to yield constant-time search
  const inGroupsByField: _.Dictionary<Object> = _.groupBy(
    normalizedRows,
    field,
  );

  // return the rows ordered for the collection to satisfy dataloader
  return collection.map(element => {
    const elementArray: Object | Array<Object> = inGroupsByField[element];
    if (!elementArray) {
      return isSingleObject ? {} : [];
    }
    return isSingleObject ? (elementArray as Array<Object>)[0] : elementArray;
  });
};
