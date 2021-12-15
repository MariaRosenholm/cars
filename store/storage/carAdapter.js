"use strict";

function adapt(car) {
  return Object.assign(car, {
    productNumber: +car.productNumber,
    model: car.model.substring(0, 1).toUpperCase() + car.model.substring(1),
    year: +car.year,
    maxspeed: +car.maxspeed,
  });
}

module.exports = { adapt };
