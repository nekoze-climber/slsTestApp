"use strict";

module.exports = class Formatter {
  getPersonFormatter(queryResult) {
    return queryResult.Items[0];
  }
};
