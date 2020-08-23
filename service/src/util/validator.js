"use strict";

module.exports = class Validator {
  checkDyanmoQueryResultEmpty(res) {
    console.log(res.Item);
    if (!Object.keys(res.Items).length) {
      return true;
    } else {
      return false;
    }
  }

  checkPersonBody(res) {
    if (
      res.hasOwnProperty("name") &&
      res.hasOwnProperty("weight") &&
      res.hasOwnProperty("height") &&
      res.hasOwnProperty("age")
    ) {
      console.log("checkPersonBody True");
      return true;
    } else {
      console.log("checkPersonBody Flase");
      return false;
    }
  }
};
