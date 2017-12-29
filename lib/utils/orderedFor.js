const humps = require('humps');
const _ = require('lodash');

// TODO add tests
const orderedFor = (rows, collection, field, isSingleObject) => {
  const normalizedRows = humps.camelizeKeys(rows);

  // build a dictionary of field : values of field from each row to yield constant-time search
  const inGroupsByField = _.groupBy(normalizedRows, field);

  // return the rows ordered for the collection to satisfy dataloader
  return collection.map(element => {
    const elementArray = inGroupsByField[element];
    if (!elementArray) {
      return isSingleObject ? {} : [];
    }
    return isSingleObject ? elementArray[0] : elementArray;
  });
};

module.exports = {
  orderedFor,
};
