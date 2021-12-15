"use strict";

const fs = require("fs").promises;

async function readJSONFile(jsonFilePath) {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeJSONFile(jsonFile, data) {
  try {
    await fs.writeFile(jsonFile, JSON.stringify(data, null, 4), {
      encoding: "utf-8",
      flag: "w",
    });
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { readJSONFile, writeJSONFile };
