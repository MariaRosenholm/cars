"use strict";

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  REMOVE_OK: 5,
  NOT_REMOVED: 6,
  UPDATE_OK: 7,
  NOT_UPDATED: 8,
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (productNumber) => ({
    message: `There is no car with this search key: ${productNumber}`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: () => ({
    message: `A new car has been added.`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: () => ({
    message: "New car was not added.",
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  REMOVE_OK: (productNumber) => ({
    message: `Car with product number ${productNumber} has been removed.`,
    code: CODES.REMOVE_OK,
    type: "info",
  }),
  NOT_REMOVED: (productNumber) => ({
    message: `There is no car with this product number: ${productNumber}. Nothing was removed.`,
    code: CODES.NOT_REMOVED,
    type: "error",
  }),
  UPDATE_OK: (productNumber) => ({
    message: `Car with product number ${productNumber} has been updated.`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: () => ({
    message: "Update not successful",
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
};

module.exports = { MESSAGES };
