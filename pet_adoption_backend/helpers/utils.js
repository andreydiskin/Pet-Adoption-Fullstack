module.exports.queryBuilder = (query) => {
  let queryBuilder = {};
  if (query["ownerId"]) {
    queryBuilder["ownerId"] = query["ownerId"];
  }
  if (query["petName"]) {
    queryBuilder["petName"] = { $regex: query["petName"] };
  }
  if (query["type"]) {
    queryBuilder["type"] = query["type"];
  }
  if (query["adoptionStatus"]) {
    queryBuilder["adoptionStatus"] = query["adoptionStatus"];
  }
  if (query["maxWeight"]) {
    queryBuilder["weight"] = { $lte: query["maxWeight"] };
  }
  if (query["minWeight"]) {
    queryBuilder["weight"] = { $gte: query["minWeight"] };
  }
  if (query["maxHeight"]) {
    queryBuilder["height"] = { $lte: query["maxHeight"] };
  }
  if (query["minHeight"]) {
    queryBuilder["height"] = { $gte: query["minHeight"] };
  }
  return queryBuilder;
};
