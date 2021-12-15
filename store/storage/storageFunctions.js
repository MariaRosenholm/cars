"use strict";

const path = require("path");
const { readJSONFile, writeJSONFile } = require("./readerWriter");
const { adapt, giveProductNumber } = require(path.join(
  __dirname,
  "carAdapter"
));
const JSONDataFilePath = path.join(__dirname, "Rosenholm_Maria_cars.json");

async function getAllFromStorage() {
  return readJSONFile(JSONDataFilePath);
}

async function getOneFromStorage(searchKey, searchValue) {
  const storage = await readJSONFile(JSONDataFilePath);
  let result = [];
  storage.forEach((car) => {
    if (car[searchKey] == searchValue) result.push(car);
  });

  return result;
}

async function addToStorage(newCarObject) {
  const storage = await readJSONFile(JSONDataFilePath);
  storage.push(adapt(newCarObject));
  return await writeJSONFile(JSONDataFilePath, storage);
}

async function updateStorage(updatedCarObject) {
  const storage = await readJSONFile(JSONDataFilePath);
  const oldCarObject = storage.find(
    (car) => car.productNumber == updatedCarObject.productNumber
  );
  if (oldCarObject) {
    Object.assign(oldCarObject, adapt(updatedCarObject));
    return await writeJSONFile(JSONDataFilePath, storage);
  }
  return false;
}

async function removeFromStorage(searchValue) {
  const storage = await readJSONFile(JSONDataFilePath);
  const i = storage.findIndex((car) => car.productNumber == searchValue);
  if (i < 0) return false;
  storage.splice(i, 1);
  return await writeJSONFile(JSONDataFilePath, storage);
}

module.exports = {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
};
