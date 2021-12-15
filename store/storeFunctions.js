"use strict";
const { all } = require("express/lib/application");
const { MESSAGES } = require("./storage/statuscodes");

const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storage/storageFunctions");

module.exports = class Datastorage {
  getAll() {
    return getAllFromStorage();
  }

  getOne(searchKey, searchValue) {
    return new Promise(async (resolve, reject) => {
      if (!searchValue || !searchKey) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else {
        const result = await getOneFromStorage(searchKey, searchValue);
        if (result) {
          if (result.length === 0) {
            reject(MESSAGES.NOT_FOUND(searchValue));
          }
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(searchValue));
        }
      }
    });
  }

  insert(car) {
    return new Promise(async (resolve, reject) => {
      if (car) {
        let allCars = await getAllFromStorage().then((cars) => cars.length);
        let newCar;
        let i = 0;

        do {
          newCar = Object.assign(car, {
            productNumber: allCars + i,
          });
          i++;
        } while (
          (await getOneFromStorage("productNumber", newCar.productNumber).then(
            (c) => c.length
          )) > 0
        );

        await addToStorage(newCar);
        resolve(MESSAGES.INSERT_OK(newCar.productNumber));
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(car) {
    return new Promise(async (resolve, reject) => {
      if (car) {
        if (await updateStorage(car)) {
          resolve(MESSAGES.UPDATE_OK(car.productNumber));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  }

  remove(searchValue) {
    return new Promise(async (resolve, reject) => {
      if (!searchValue) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else if (await removeFromStorage(searchValue)) {
        resolve(MESSAGES.REMOVE_OK(searchValue));
      } else {
        reject(MESSAGES.NOT_REMOVED(searchValue));
      }
    });
  }
};
